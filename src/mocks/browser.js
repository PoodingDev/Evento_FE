import { setupWorker } from "msw";
import { calendarHandlers } from "./handlers/calendarHandlers";
import { commentHandlers } from "./handlers/commentHandlers";
import { eventHandlers } from "./handlers/eventHandlers";
import { loginHandlers } from "./handlers/loginHandlers";
import { userHandlers } from "./handlers/userHandlers";

// src/mocks/browser.js

export const worker = setupWorker(
  ...loginHandlers,
  ...userHandlers,
  ...calendarHandlers,
  ...eventHandlers,
  ...commentHandlers,
);
