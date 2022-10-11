import { atom } from "recoil";
import { ITodoState } from "./interface/atominterface";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const Todos = atom<ITodoState>({
  key: "todos",
  default: {
    todo: [],
    doing: [],
    done: [],
  },
  effects_UNSTABLE: [persistAtom],
});
