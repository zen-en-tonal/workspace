import { subfocus } from "../deps.ts";

export const pick = (key: string | number) => ({
  // deno-lint-ignore no-explicit-any
  run: (obj: { [K in typeof key]: any }) => Promise.resolve(obj[key]),
});

export const prism = (scheme: subfocus.Scheme) => ({
  run: (record: subfocus.Record) =>
    Promise.resolve(subfocus.fromScheme(scheme)(record)),
});
