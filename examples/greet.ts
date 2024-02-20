import { isFunction } from "../mod.ts";

type Context = {
  greet: string;
  name: string;
};

// the function must be exported as default.
export default function func(c: Context): Promise<string> {
  return Promise.resolve(`${c.greet}! ${c.name}`);
}

if (import.meta.main) {
  // use `isFunction` to validate the function should work.
  isFunction(func);

  console.log(
    await func({ greet: "こんにちは", name: "太郎さん" }),
  );
}
