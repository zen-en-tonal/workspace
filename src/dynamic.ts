import { Function } from "./runner.ts";

/**
 * dispatch provides the function where on src.
 * @param src where the function is placed on remote.
 * @returns function to run.
 */
export async function dispatch<T, Q>(
  src: string,
): Promise<Function<T, Q>> {
  const mod = await import(src);
  return mod.default as Function<T, Q>;
}

/**
 * isFunction checks what the type of defined function is valid.
 * @param func to check
 */
// deno-lint-ignore no-unused-vars
export const isFunction = <T, Q>(func: Function<T, Q>) => {};
