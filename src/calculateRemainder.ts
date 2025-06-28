import { clearExisting, showError, formatValue } from "./utils";

export function CalculateRemainder() {
  clearExisting("remainingMortgage");

  const currentElement = document.getElementById(
    "mortgage2"
  ) as HTMLInputElement;
  const current = Number(currentElement.value);

  const repaymentElement = document.getElementById(
    "repayment2"
  ) as HTMLInputElement;
  const repayment = Number(repaymentElement.value);

  const intRateInputElement = document.getElementById(
    "int-rate2"
  ) as HTMLInputElement;
  const intRateInput = intRateInputElement.value.trim();

  const validNumberRegex = /^-?\d+(\.\d+)?$/;

  if (!validNumberRegex.test(intRateInput)) {
    showError(
      "Please enter a valid number for 'Annual Interest Rate'",
      "remainingMortgage"
    );
    return;
  }
  const intRate = Number(intRateInput) / 100;

  const yearsElement = document.getElementById("years2") as HTMLInputElement;
  const years = Number(yearsElement.value);

  const months = years * 12;

  let remaining = current;

  if (isNaN(current) || current <= 0) {
    showError(
      "Please enter a positive number for 'Current Remaining Mortgage'",
      "remainingMortgage"
    );
    return;
  }

  if (isNaN(repayment) || repayment <= 0) {
    showError(
      "Please enter a positive number for 'Repayment per Month'",
      "remainingMortgage"
    );
    return;
  }

  if (isNaN(years) || years <= 0) {
    showError(
      "Please enter a positive number for 'Number of Years'",
      "remainingMortgage"
    );
    return;
  }

  for (let i = 0; i < months; i++) {
    remaining = remaining * (1 + intRate / 12) - repayment;
  }

  const formattedRemainder = formatValue(remaining, 2);

  const calculationDiv2 = document.getElementById(
    "remainingMortgage"
  ) as HTMLElement;
  const output = document.createElement("h3");
  output.textContent =
    "Remaining Mortgage after " + years + " years = $" + formattedRemainder;
  calculationDiv2.appendChild(output);
}
