import { setupWorker } from "msw";
import { authHandlers } from "./handlers/authHandlers";
import { userHandlers } from "./handlers/userHandlers";

export const worker = setupWorker(...authHandlers, ...userHandlers);
