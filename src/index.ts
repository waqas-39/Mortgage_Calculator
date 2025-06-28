import { CalculateTime } from "./calculateTime";
import { CalculateRemainder } from "./calculateRemainder";
import { CalculateTotal } from "./calculateTotal";

document
  .querySelectorAll("form")
  .forEach((form) =>
    form.addEventListener("submit", (e) => e.preventDefault())
  );

globalThis.CalculateTotal = CalculateTotal;
globalThis.CalculateRemainder = CalculateRemainder;
globalThis.CalculateTime = CalculateTime;
