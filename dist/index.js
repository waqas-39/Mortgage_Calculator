"use strict";
(() => {
  // src/utils.ts
  function clearExisting(resultContainer) {
    const clearA = document.getElementById(resultContainer);
    clearA.innerHTML = "";
  }
  function showError(message, container) {
    const output = document.getElementById(container);
    const error1 = document.createElement("p");
    error1.textContent = message;
    error1.style.color = "red";
    error1.style.fontWeight = "bold";
    output.appendChild(error1);
  }
  function formatValue(value, decimals) {
    const intermediateValue = value.toFixed(decimals);
    const formattedTotal = Number(intermediateValue).toLocaleString(void 0, {
      minimumFractionDigits: decimals
    });
    return formattedTotal;
  }

  // src/calculateTime.ts
  function CalculateTime() {
    clearExisting("remainingTime");
    clearExisting("mortgageTable");
    const mortgageElement = document.getElementById(
      "mortgage3"
    );
    const mortgage = Number(mortgageElement.value);
    const repaymentElement = document.getElementById(
      "repayment3"
    );
    const repayment = Number(repaymentElement.value);
    const intRateInputElement = document.getElementById(
      "int-rate3"
    );
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
    let tableHTML = '<table role="table" aria-label="Mortgage Repayment Summary">';
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
    );
    const output = document.createElement("h3");
    if (monthCounter > 1e3) {
      showError(
        "You have over 100 years left on your mortgage. Please save yourself :(",
        "remainingTime"
      );
      return;
    }
    const yearsLeft = Math.floor(monthCounter / 12);
    const monthsLeft = Math.ceil(monthCounter % 12);
    output.textContent = "You have around " + yearsLeft + " years and " + monthsLeft + " months left on your mortgage!";
    calculationDiv3.appendChild(output);
    const mortgageTableElement = document.getElementById(
      "mortgageTable"
    );
    mortgageTableElement.innerHTML = tableHTML;
  }

  // src/calculateRemainder.ts
  function CalculateRemainder() {
    clearExisting("remainingMortgage");
    const currentElement = document.getElementById(
      "mortgage2"
    );
    const current = Number(currentElement.value);
    const repaymentElement = document.getElementById(
      "repayment2"
    );
    const repayment = Number(repaymentElement.value);
    const intRateInputElement = document.getElementById(
      "int-rate2"
    );
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
    const yearsElement = document.getElementById("years2");
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
    );
    const output = document.createElement("h3");
    output.textContent = "Remaining Mortgage after " + years + " years = $" + formattedRemainder;
    calculationDiv2.appendChild(output);
  }

  // src/calculateTotal.ts
  function CalculateTotal() {
    clearExisting("totalMortgage");
    const repaymentElement = document.getElementById(
      "repayment"
    );
    const repayment = Number(repaymentElement.value);
    const termElement = document.getElementById("term");
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
    );
    const output = document.createElement("h3");
    output.textContent = "Lifetime Total = $" + formattedTotal;
    calculationDiv1.appendChild(output);
  }

  // src/index.ts
  document.querySelectorAll("form").forEach(
    (form) => form.addEventListener("submit", (e) => e.preventDefault())
  );
  globalThis.CalculateTotal = CalculateTotal;
  globalThis.CalculateRemainder = CalculateRemainder;
  globalThis.CalculateTime = CalculateTime;
})();
