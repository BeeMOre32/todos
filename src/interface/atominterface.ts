export interface ITodoState {
  [key: string]: ITodo[];
}

export interface ITodo {
  id: number;
  text: string;
}
