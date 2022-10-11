import { ITodo } from "./atominterface";

export interface IBoardProp {
  index: number;
  todo: ITodo[];
  boardId: string;
}

export interface IForm {
  text: string;
}

export interface IAddToDo {
  boardId: string;
}

export interface IToDoProp {
  draggableId: number;
  boardId: string;
  text: string;
  index: number;
}
