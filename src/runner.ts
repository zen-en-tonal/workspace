export type Function<T, Q> = (arg: T) => Promise<Q>;

export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; message: string; cause?: string };

export function run<T, Q>(
  func: Function<T, Q>,
): (context: T) => Promise<Result<Q>> {
  return async (context: T) => {
    try {
      return {
        ok: true,
        value: await func(context),
      };
    } catch (e) {
      if (e instanceof Error) {
        return { ok: false, message: e.message, cause: e.cause as string };
      }
      return { ok: false, message: "unknown" };
    }
  };
}
