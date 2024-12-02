import { setupWorker } from "msw";
import { calendarHandlers } from "./handlers/calendarHandlers";
import { loginHandlers } from "./handlers/loginHandlers";
import { userHandlers } from "./handlers/userHandlers";

// src/mocks/browser.js

export const worker = setupWorker(
  ...loginHandlers,
  ...userHandlers,
  ...calendarHandlers,
);
