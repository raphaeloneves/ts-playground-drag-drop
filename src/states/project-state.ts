import { Project, ProjectStatus } from "../models/project";
import { State } from "./base-state";

export class ProjectState extends State<Project> {
  private static instance: ProjectState;

  static getInstane() {
    if (!this.instance) {
      this.instance = new ProjectState();
    }
    return this.instance;
  }

  updateProjectStatus(projectId: string, projectStatus: ProjectStatus): void {
    const project = this.dataSet.find(prj => prj.id === projectId);
    if (project && project.status !== projectStatus) {
      project.status = projectStatus;
      this.executeListeners();
    }
  }
}

export const projectState = ProjectState.getInstane();
