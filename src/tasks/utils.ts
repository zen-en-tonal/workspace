export const ident = {
  run: <T>(arg: T) => Promise.resolve(arg),
};

/**
 * fn wraps a function into a Task.
 * @param f
 * @returns
 */
export const fn = <T, Q>(f: (arg: T) => Q) => ({
  run: (a: T) => Promise.resolve(f(a)),
});
