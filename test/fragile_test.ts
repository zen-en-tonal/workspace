import { run } from "../src/mod.ts";
import { assertEquals } from "./deps.ts";

Deno.test("fragile func", async () => {
  const fragile_func = () => {
    throw new Error("error");
  };
  const res = await run(fragile_func, { now: 1708087637000 })(null);
  assertEquals(res, {
    ok: false,
    message: "error",
    cause: undefined,
    _timestamp: "2024-02-16T12:47:17.000Z",
  });
});
