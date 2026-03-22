import type {Action} from "./action.js";


export interface Consumer {
  sendAction(action: Action): void;
}

