import { subfocus } from "../deps.ts";
import { fn } from "./utils.ts";

export const pick = (key: string | number) =>
  // deno-lint-ignore no-explicit-any
  fn((obj: { [K in typeof key]: any }) => obj[key]);

export const prism = (scheme: subfocus.Scheme) =>
  fn((record: subfocus.Record) => subfocus.fromScheme(scheme)(record));
