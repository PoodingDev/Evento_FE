import { setupWorker } from "msw";
import { loginHandlers } from "./handlers/loginHandlers";

export const worker = setupWorker(...loginHandlers);
