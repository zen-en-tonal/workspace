export type Task<T, Q> = {
  run: (arg: T) => Promise<Q>;
};

export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; message: string; cause?: string };

export type Function<C, T, Q> = (context: C) => Task<T, Q>;
export type Argument<C, T> = (context: C) => T;

export function runner<C, T, Q>(
  func: Function<C, T, Q>,
  args: Argument<C, T>,
): (context: C) => Promise<Result<Q>> {
  return async (context: C) => {
    const task = func(context);
    const arg = args(context);
    try {
      return {
        ok: true,
        value: await task.run(arg),
      };
    } catch (e) {
      if (e instanceof Error) {
        return { ok: false, message: e.message, cause: e.cause as string };
      }
      return { ok: false, message: "unknown" };
    }
  };
}
