import { Draggable, Droppable } from "react-beautiful-dnd";
import { IBoardProp } from "../interface/cominterface";
import styled from "styled-components";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { useSetRecoilState } from "recoil";
import { Todos } from "../atom";

const Boards = styled.div`
  padding: 10px;
  box-sizing: border-box;
  width: 500px;
  min-height: 30vh;
  max-height: fit-content;
  border-radius: 1.5em;
  background-color: ${(props) => props.theme.bgColor};
  box-shadow: rgba(17, 12, 46, 0.15) 0 48px 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  h1 {
    font-size: 1.5em;
  }
  form {
    margin-top: 2em;
  }
  button {
    background-color: inherit;
    border: none;
    position: absolute;
    top: 10px;
    right: 10%;
  }
`;

const Area = styled.div<{ isDragHover: boolean }>`
  background-color: ${(p) => (p.isDragHover ? p.theme.btnColor : "inherit")};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;

export default function Board({ boardId, todo, index }: IBoardProp) {
  const setTodo = useSetRecoilState(Todos);
  return (
    <Draggable key={boardId} draggableId={boardId} index={index}>
      {(Draggable) => (
        <Droppable type="boardInside" droppableId={boardId}>
          {(provided, snapshot) => (
            <Boards {...Draggable.draggableProps} ref={Draggable.innerRef}>
              <h1 {...Draggable.dragHandleProps}>{boardId}</h1>
              <button
                onClick={() => {
                  setTodo((currVal) => {
                    const copy = { ...currVal };
                    delete copy[boardId];
                    return copy;
                  });
                }}
              >
                ❌
              </button>
              <AddTodo boardId={boardId} />
              <Area
                isDragHover={snapshot.isDraggingOver}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {todo.map((value, index1) => (
                  <Todo
                    boardId={boardId}
                    key={index1}
                    index={index1}
                    draggableId={value.id}
                    text={value.text}
                  />
                ))}
              </Area>
              {provided.placeholder}
            </Boards>
          )}
        </Droppable>
      )}
    </Draggable>
  );
}
