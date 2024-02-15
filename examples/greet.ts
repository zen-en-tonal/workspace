import {
  isScript,
  runScript,
  tasks,
} from "https://deno.land/x/yagura@v0.0.2/mod.ts";

type Context = {
  greet: string;
  name: string;
};

// the script must be exported as default.
export default function script(_: typeof tasks) {
  return {
    func: (c: Context) => ({
      run: (name: string) => Promise.resolve(`${c.greet}! ${name}`),
    }),
    args: (c: Context) => c.name,
  };
}

if (import.meta.main) {
  // use `isScript` to validate the script should work.
  isScript(script);

  // we can use `runScript` to check the script works.
  console.log(
    await runScript(script)({ greet: "こんにちは", name: "太郎さん" }),
  );
}
