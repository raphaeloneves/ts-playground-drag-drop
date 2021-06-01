export interface Draggable {
  dragStartEventHandler(event: DragEvent): void;
  dragEndEventHandler(event: DragEvent): void;
}

export interface Droppable {
  dragOverEvenHandler(event: DragEvent): void;
  dropEventHandler(event: DragEvent): void;
  dragLeaveEventHandler(event: DragEvent): void;
}
