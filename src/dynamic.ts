import { runner, tasks } from "./mod.ts";
import { RunArgs } from "./runner.ts";

export type Script<C, T, Q> = (api: typeof tasks) => RunArgs<C, T, Q>;

export async function dispatch<C, T, Q>(
  src: string,
): Promise<ReturnType<typeof runner.run<C, T, Q>>> {
  const script = await import(src) as Script<C, T, Q>;
  return runScript(script);
}

export function runScript<C, T, Q>(
  script: Script<C, T, Q>,
): ReturnType<typeof runner.run<C, T, Q>> {
  const args = script(tasks);
  return runner.run(args);
}

/**
 * isScript checks what the type of defined script is valid.
 * @param script script to check
 */
// deno-lint-ignore no-unused-vars
export const isScript = <C, T, Q>(script: Script<C, T, Q>) => {};
