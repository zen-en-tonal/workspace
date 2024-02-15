export type Task<T, Q> = {
  run: (arg: T) => Promise<Q>;
};

export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; message: string; cause?: string };

export function execute<T, Q>(
  runner: Task<T, Q>,
): (arg: T) => Promise<Result<Q>> {
  return async (arg: T) => {
    try {
      return {
        ok: true,
        value: await runner.run(arg),
      };
    } catch (e) {
      if (e instanceof Error) {
        return { ok: false, message: e.message, cause: e.cause as string };
      }
      return { ok: false, message: "unknown" };
    }
  };
}
