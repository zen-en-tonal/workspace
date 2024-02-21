import { Logger } from "./deps.ts";

export type Function<T, Q> = (arg: T) => Promise<Q>;

type Meta = { _timestamp: string };

export type Result<T> =
  & (
    | { ok: true; value: T }
    | { ok: false; message: string; cause?: string }
  )
  & Meta;

export const timestamp = (now?: number) =>
  new Date(now ?? Date.now()).toISOString();

export function run<T, Q>(
  func: Function<T, Q>,
  config?: {
    now?: number;
    logger?: Logger;
  },
): (context: T) => Promise<Result<Q>> {
  return async (context: T) => {
    const time = timestamp(config?.now);
    try {
      return {
        ok: true,
        value: await func(context),
        _timestamp: time,
      };
    } catch (e) {
      const err = errorResp<Q>(e, time);
      config?.logger?.error(Object.assign(err, { stack: e }));
      return err;
    }
  };
}

const errorResp = <T>(e: unknown, timestamp: string): Result<T> => {
  if (e instanceof Error) {
    return {
      ok: false,
      message: e.message,
      cause: e.cause as string,
      _timestamp: timestamp,
    };
  }
  return {
    ok: false,
    message: "unknown",
    _timestamp: timestamp,
  };
};
