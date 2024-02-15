export { tasks } from "./src/mod.ts";

import { dynamic } from "./src/mod.ts";
export const runScript = dynamic.runScript;
export const isScript = dynamic.isScript;
export type Script<Context, Argument, Result> = dynamic.Script<
  Context,
  Argument,
  Result
>;
