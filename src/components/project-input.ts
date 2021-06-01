import { Autobind } from "../decorators/autobind";
import { Project, ProjectStatus } from "../models/project";
import { projectState } from "../states/project-state";
import { Validatable, validate } from "../validators/base-validator";
import { Component } from "./base-component";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    private titleInputElement: HTMLInputElement;
    private descriptionInputElement: HTMLInputElement;
    private peopleInputElement: HTMLInputElement;
  
    constructor() {
      super("project-input", "app", true, "user-input");
      this.titleInputElement = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        "#description"
      ) as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector(
        "#people"
      ) as HTMLInputElement;
  
      this.configure();
    }
  
    configure() {
      this.element.addEventListener("submit", this.submitEventHandler);
    }
  
    renderContent() {}
  
    @Autobind
    private submitEventHandler(event: Event) {
      event.preventDefault();
      const inputs = this.getInputValues();
      if (Array.isArray(inputs)) {
        const [title, description, people] = inputs;
  
        const project = new Project(
          title,
          description,
          people,
          ProjectStatus.ACTIVE
        );
        projectState.add(project);
        this.clearInputsValue();
      }
    }
  
    private clearInputsValue() {
      this.titleInputElement.value = "";
      this.descriptionInputElement.value = "";
      this.peopleInputElement.value = "";
    }
  
    private getInputValues(): [string, string, number] | void {
      const title = this.titleInputElement.value;
      const description = this.descriptionInputElement.value;
      const people = this.peopleInputElement.value;
  
      const titleValidator: Validatable = {
        value: title,
        required: true,
      };
      const descriptionValidator: Validatable = {
        value: description,
        required: true,
        minLength: 5,
        maxLength: 8,
      };
      const peopleValidator: Validatable = {
        value: +people,
        required: true,
        max: 5,
        min: 1,
      };
  
      if (
        !validate(titleValidator) ||
        !validate(descriptionValidator) ||
        !validate(peopleValidator)
      ) {
        alert("Error validating the data.");
        return;
      }
  
      return [title, description, +people];
    }
  }