import { runScript, tasks } from "../mod.ts";
import { assertEquals } from "../src/deps.ts";

Deno.test("fragile task", async () => {
  const fragile_script = (t: typeof tasks) => ({
    func: () =>
      t.fn(() => {
        throw new Error("invaild task");
      }),
    args: () => {},
  });

  const res = await runScript(fragile_script)(null);

  assertEquals(res, { ok: false, message: "invaild task", cause: undefined });
});

Deno.test("fragile func", async () => {
  const fragile_script = (_: typeof tasks) => ({
    func: () => {
      throw new Error("invaild func");
    },
    args: () => {},
  });

  const res = await runScript(fragile_script)(null);

  assertEquals(res, { ok: false, message: "invaild func", cause: undefined });
});

Deno.test("fragile args", async () => {
  const fragile_args = (t: typeof tasks) => ({
    func: () => t.fn(() => {}),
    args: () => {
      throw new Error("invaild args");
    },
  });

  const res = await runScript(fragile_args)(null);

  assertEquals(res, { ok: false, message: "invaild args", cause: undefined });
});
