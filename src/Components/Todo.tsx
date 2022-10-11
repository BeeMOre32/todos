import { IToDoProp } from "../interface/cominterface";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { Todos } from "../atom";

const DraggableCard = styled.div`
  width: 75%;
  height: 1.4em;
  background-color: white;
  padding: 5px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  position: relative;
  span {
    width: 100%;
  }
  p {
    cursor: default;
    position: absolute;
    right: 1em;
  }
`;

export default function Todo({ text, draggableId, index, boardId }: IToDoProp) {
  const seToDo = useSetRecoilState(Todos);
  return (
    <Draggable
      key={draggableId + ""}
      draggableId={draggableId + ""}
      index={index}
    >
      {(provided) => (
        <DraggableCard ref={provided.innerRef} {...provided.draggableProps}>
          <span {...provided.dragHandleProps}>{text}</span>
          <p
            onClick={() => {
              seToDo((currVal) => {
                const copy = { ...currVal };
                const copiedBoard = [...copy[boardId]];
                copiedBoard.splice(index, 1);
                return {
                  ...copy,
                  [boardId]: copiedBoard,
                };
              });
            }}
          >
            ❌
          </p>
        </DraggableCard>
      )}
    </Draggable>
  );
}
