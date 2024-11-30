import { setupWorker } from "msw";
import { loginHandlers } from "./handlers/loginHandlers";
import { userHandlers } from "./handlers/userHandlers";

export const worker = setupWorker(...loginHandlers, ...userHandlers);
