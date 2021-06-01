import { Autobind } from "../decorators/autobind";
import { Droppable } from "../interfaces/drag-drop";
import { Project, ProjectStatus } from "../models/project";
import { projectState } from "../states/project-state";
import { Component } from "./base-component";
import { ProjectItem } from "./project-item";

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements Droppable
{
  private existingProjects: Array<Project> = [];

  constructor(private projectStatus: ProjectStatus) {
    super("project-list", "app", false, `${projectStatus}-projects`);
    this.configure();
    this.renderContent();
  }

  @Autobind
  dragOverEvenHandler(event: DragEvent): void {
    if (event.dataTransfer?.types[0] === "text/plain") {
      event.preventDefault();
      const listElement = this.element.querySelector("ul");
      listElement?.classList.add("droppable");
    }
  }

  @Autobind
  dropEventHandler(event: DragEvent): void {
    const projectId = event.dataTransfer?.getData("text/plain")!;
    projectState.updateProjectStatus(projectId, this.stateToUpdate);
  }

  @Autobind
  dragLeaveEventHandler(_: DragEvent): void {
    const listElement = this.element.querySelector("ul");
    listElement?.classList.remove("droppable");
  }

  renderContent() {
    this.element.querySelector(
      "ul"
    )!.id = `${this.projectStatus}-projects-list`;
    this.element.querySelector(
      "h2"
    )!.textContent = `${this.projectStatus.toUpperCase()} PROJECTS`;
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverEvenHandler);
    this.element.addEventListener("dragleave", this.dragLeaveEventHandler);
    this.element.addEventListener("drop", this.dropEventHandler);

    projectState.addListener((projects: Array<Project>) => {
      const relevantProjects = projects.filter(
        (p) => p.status == this.projectStatus
      );
      this.existingProjects = relevantProjects;
      this.renderProjects();
    });
  }

  private renderProjects() {
    const listElement = document.getElementById(
      `${this.projectStatus}-projects-list`
    )!;
    listElement.innerHTML = "";
    for (const project of this.existingProjects) {
      new ProjectItem(
        project,
        "single-project",
        this.element.querySelector("ul")!.id
      );
    }
  }

  get stateToUpdate() {
    if (this.element.id === `${ProjectStatus.ACTIVE}-projects`) {
      return ProjectStatus.ACTIVE;
    }
    return ProjectStatus.FINISHED;
  }
}
