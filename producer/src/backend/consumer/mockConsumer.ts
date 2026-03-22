import type {Action} from "./action.js";
import type {Consumer} from "./consumer.js";

export class MockConsumer implements Consumer {
    sendAction(action: Action) {
        console.log(JSON.stringify(action));
    }
}