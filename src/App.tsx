import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Board from "./Components/Board";
import { useRecoilState } from "recoil";
import { Todos } from "./atom";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 3em;
  align-items: center;
  display: flex;
`;

const BoardGrid = styled.div`
  max-width: 100vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
`;

const AddBoardForm = styled.form`
  position: absolute;
  top: 5%;
  right: 50%;
  left: 35%;
  input {
    width: 20em;
    height: 3em;
    background-color: inherit;
    border: none;
    border-bottom: 1px solid black;
    font-size: 1.2em;
    :focus {
      outline: none;
    }
  }
`;

function App() {
  const [toDo, settoDo] = useRecoilState(Todos);
  const { register, handleSubmit, setValue } = useForm<{ text: string }>();

  const onSubmit = (data: { text: string }) => {
    const newBoard = {
      [data.text]: [],
    };
    settoDo((currVal) => {
      setValue("text", "");
      return { ...currVal, ...newBoard };
    });
  };

  const onDragEndHandle = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    if (info.type === "board") {
      settoDo((allBoard) => {
        const copiedBoard = Object.entries({ ...allBoard });
        const cutTodo = [...copiedBoard.splice(source.index, 1)];
        copiedBoard.splice(destination.index, 0, ...cutTodo);
        return {
          ...Object.fromEntries(copiedBoard),
        };
      });
    }
    if (destination?.droppableId === source.droppableId) {
      settoDo((allBoard) => {
        const copy = [...allBoard[source.droppableId]];
        const copyObj = copy[source.index];
        copy.splice(source.index, 1);
        copy.splice(destination.index, 0, copyObj);
        return {
          ...allBoard,
          [source.droppableId]: copy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      settoDo((allBoard) => {
        const sourceBoard = [...allBoard[source.droppableId]];
        const copySource = sourceBoard[source.index];
        const destinationBoard = [...allBoard[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, copySource);
        return {
          ...allBoard,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <>
      <AddBoardForm onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("text", { required: true })}
          placeholder="Write add board"
          type="text"
        />
      </AddBoardForm>
      <Wrapper>
        <DragDropContext onDragEnd={onDragEndHandle}>
          <Droppable
            type="board"
            direction="horizontal"
            droppableId="boardMove"
          >
            {(provided) => (
              <BoardGrid ref={provided.innerRef} {...provided.droppableProps}>
                {Object.keys(toDo).map((value, index) => (
                  <Board
                    boardId={value}
                    index={index}
                    todo={toDo[value]}
                    key={index}
                  />
                ))}{" "}
                {provided.placeholder}
              </BoardGrid>
            )}
          </Droppable>
        </DragDropContext>
      </Wrapper>
    </>
  );
}

export default App;
