export type Function<T, Q> = (arg: T) => Promise<Q>;

type Meta = { _timestamp: string };
export type Result<T> =
  & (
    | { ok: true; value: T }
    | { ok: false; message: string; cause?: string }
  )
  & Meta;

const timestamp = (now?: number) => new Date(now ?? Date.now()).toISOString();

export function run<T, Q>(
  func: Function<T, Q>,
  now?: number,
): (context: T) => Promise<Result<Q>> {
  return async (context: T) => {
    try {
      return {
        ok: true,
        value: await func(context),
        _timestamp: timestamp(now),
      };
    } catch (e) {
      if (e instanceof Error) {
        return {
          ok: false,
          message: e.message,
          cause: e.cause as string,
          _timestamp: timestamp(now),
        };
      }
      return { ok: false, message: "unknown", _timestamp: timestamp(now) };
    }
  };
}
