import { useForm } from "react-hook-form";
import { IAddToDo, IForm } from "../interface/cominterface";
import { useRecoilState } from "recoil";
import { Todos } from "../atom";
import styled from "styled-components";

const AddForm = styled.form`
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  input {
    width: 60%;
    background-color: inherit;
    border: 1px solid black;
    height: 2em;
    :focus {
      outline: none;
    }
    ::placeholder {
      color: black;
    }
  }
`;

export default function AddTodo({ boardId }: IAddToDo) {
  const [, setTodo] = useRecoilState(Todos);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = (data: IForm) => {
    setValue("text", "");
    const newTodo = {
      id: Date.now(),
      text: data.text,
    };
    return setTodo((currVal) => {
      return { ...currVal, [boardId]: [...currVal[boardId], newTodo] };
    });
  };
  return (
    <AddForm onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("text", { required: true })}
        type="text"
        placeholder="Write your task"
      />
    </AddForm>
  );
}
