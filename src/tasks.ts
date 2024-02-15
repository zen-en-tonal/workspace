import { Task } from "./runner.ts";

const chain = <T, Q>(from: Task<T, Q>) =>
<R>(
  then: Task<Q, R>,
): Task<T, R> => ({
  run: (arg: T) => from.run(arg).then((x) => then.run(x)),
});

export function seq<T, Q>(start: Task<T, Q>) {
  return ({
    run: start.run,
    then: <R>(after: Task<Q, R>) => seq(chain(start)(after)),
  });
}

export * from "./tasks/mod.ts";
