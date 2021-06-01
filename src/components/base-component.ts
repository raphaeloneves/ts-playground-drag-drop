export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  protected templateElement: HTMLTemplateElement;
  protected targetElement: T;
  protected element: U;

  constructor(
    templateId: string,
    renderElementId: string,
    insertAfterBegin: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    ) as HTMLTemplateElement;
    this.targetElement = document.getElementById(renderElementId) as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAfterBegin);
  }

  protected attach(insertAfterBegin: boolean) {
    this.targetElement.insertAdjacentElement(
      insertAfterBegin ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
