import { clearExisting, showError, formatValue } from "./utils";

export function CalculateTime() {
  clearExisting("remainingTime");
  clearExisting("mortgageTable");

  const mortgageElement = document.getElementById(
    "mortgage3"
  ) as HTMLInputElement;
  const mortgage = Number(mortgageElement.value);

  const repaymentElement = document.getElementById(
    "repayment3"
  ) as HTMLInputElement;
  const repayment = Number(repaymentElement.value);

  const intRateInputElement = document.getElementById(
    "int-rate3"
  ) as HTMLInputElement;
  const intRateInput = intRateInputElement.value.trim();

  const validNumberRegex = /^-?\d+(\.\d+)?$/;
  if (!validNumberRegex.test(intRateInput)) {
    showError(
      "Please enter a valid number for 'Annual Interest Rate'",
      "remainingTime"
    );
    return;
  }

  const intRate = Number(intRateInput) / 100;

  let tableHTML =
    '<table role="table" aria-label="Mortgage Repayment Summary">';
  tableHTML += `<tr><th>Year</th><th>Remaining Mortgage</th></tr>`;

  if (isNaN(mortgage) || mortgage <= 0) {
    showError(
      "Please enter a positive number for 'Current Remaining Mortgage'",
      "remainingTime"
    );
    return;
  }

  if (isNaN(repayment) || repayment <= 0) {
    showError(
      "Please enter a positive number for 'Repayment per Month'",
      "remainingTime"
    );
    return;
  }

  let monthCounter = 0;
  let remaining = mortgage;

  if (intRate < 0) {
    showError("Negative interest rates aren't supported.", "remainingTime");
    return;
  }

  while (remaining > 0) {
    remaining = remaining * (1 + intRate / 12) - repayment;
    if (remaining >= mortgage) {
      showError(
        "At this rate, you will never pay off your mortgage :(",
        "remainingTime"
      );
      return;
    }

    monthCounter++;

    if (monthCounter % 12 === 0) {
      tableHTML += `<tr><td>${monthCounter / 12}</td>
            <td>$${formatValue(remaining, 2)}</td></tr>`;
    }
  }

  tableHTML += "</table>";

  const calculationDiv3 = document.getElementById(
    "remainingTime"
  ) as HTMLElement;
  const output = document.createElement("h3");

  if (monthCounter > 1000) {
    showError(
      "You have over 100 years left on your mortgage. Please save yourself :(",
      "remainingTime"
    );
    return;
  }

  const yearsLeft = Math.floor(monthCounter / 12);
  const monthsLeft = Math.ceil(monthCounter % 12);

  output.textContent =
    "You have around " +
    yearsLeft +
    " years and " +
    monthsLeft +
    " months left on your mortgage!";
  calculationDiv3.appendChild(output);

  const mortgageTableElement = document.getElementById(
    "mortgageTable"
  ) as HTMLElement;
  mortgageTableElement.innerHTML = tableHTML;
}
