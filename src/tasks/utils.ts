/**
 * fn wraps a function into a Task.
 * @param f
 * @returns
 */
export const fn = <T, Q>(f: (arg: T) => Q) => ({
  run: (a: T) => Promise.resolve(f(a)),
});

export const ident = fn(<T>(args: T) => args);
