export const pick = (key: string | number) => ({
  // deno-lint-ignore no-explicit-any
  run: (obj: { [K in typeof key]: any }) => Promise.resolve(obj[key]),
});
