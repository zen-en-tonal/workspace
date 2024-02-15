import {
  isScript,
  runScript,
  tasks,
} from "https://deno.land/x/yagura@v0.0.3/mod.ts";

type Context = {
  greet: string;
  name: string;
};

// the script must be exported as default.
export default function script(t: typeof tasks) {
  return {
    func: (c: Context) => t.fn((name: string) => `${c.greet}! ${name}`),
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
