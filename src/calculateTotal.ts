import { clearExisting, showError, formatValue } from "./utils";

export function CalculateTotal() {
  clearExisting("totalMortgage");

  const repaymentElement = document.getElementById(
    "repayment"
  ) as HTMLInputElement;
  const repayment = Number(repaymentElement.value);

  const termElement = document.getElementById("term") as HTMLInputElement;
  const term = Number(termElement.value);

  if (isNaN(repayment) || repayment <= 0) {
    showError(
      "Please enter a positive number for 'Repayment'",
      "totalMortgage"
    );
    return;
  }

  if (isNaN(term) || term <= 0) {
    showError("Please enter a positive number for 'Term'", "totalMortgage");
    return;
  }

  const total = repayment * term * 12;
  const formattedTotal = formatValue(total, 2);

  const calculationDiv1 = document.getElementById(
    "totalMortgage"
  ) as HTMLElement;
  const output = document.createElement("h3");
  output.textContent = "Lifetime Total = $" + formattedTotal;
  calculationDiv1.appendChild(output);
}
