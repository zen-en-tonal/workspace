import { fn } from "./utils.ts";

export const regexp = (pattern: RegExp, groupKey: string) => ({
  run: (str: string) => {
    const reg = new RegExp(pattern);
    const match = reg.exec(str)?.groups?.[groupKey];
    if (!match) {
      return Promise.reject("pattern was not mathed");
    } else {
      return Promise.resolve(match);
    }
  },
});

export const replace = (pattern: string, replacement: string) =>
  fn((str: string) => str.replace(pattern, replacement));

export const deserialize = fn((serialize: string) => JSON.parse(serialize));
