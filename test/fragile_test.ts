import { run } from "../src/mod.ts";
import { assertEquals } from "./deps.ts";

Deno.test("fragile func", async () => {
  const fragile_func = () => {
    throw new Error("error");
  };
  const res = await run(fragile_func)(null);
  assertEquals(res, { ok: false, message: "error", cause: undefined });
});
