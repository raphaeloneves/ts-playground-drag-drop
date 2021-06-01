import { Autobind } from "../decorators/autobind";
import { Draggable } from "../interfaces/drag-drop";
import { Project } from "../models/project";
import { Component } from "./base-component";

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  get persons() {
    let description: string;
    if (this.project.people === 1) {
      description = "1 person";
    } else {
      description = `${this.project.people} persons`;
    }
    return description;
  }
  constructor(private project: Project, templateId: string, targetId: string) {
    super(templateId, targetId, false, project.id);

    this.configure();
    this.renderContent();
  }

  @Autobind
  dragStartEventHandler(event: DragEvent): void {
    event.dataTransfer?.setData("text/plain", this.project.id);
  }

  dragEndEventHandler(_: DragEvent): void {}

  configure() {
    this.element.addEventListener("dragstart", this.dragStartEventHandler);
    this.element.addEventListener("dragend", this.dragEndEventHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = `${this.persons} assigned`;
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
