document.querySelectorAll("form").forEach(form => 
    form.addEventListener("submit", e => e.preventDefault())
);


function CalculateTotal(){
    clearExisting("totalMortgage");

    const repayment = Number(document.getElementById("repayment").value);
    const term = Number(document.getElementById("term").value);

    if (isNaN(repayment) || repayment <=0){
        showError("Please enter a positive number for 'Repayment'", "totalMortgage");
        return;
    }

    if (isNaN(term) || term <=0){
        showError("Please enter a positive number for 'Term'", "totalMortgage");
        return;
    }

    const total = (repayment * term * 12)
    const formattedTotal = formatValue(total, 2);

    const calculationDiv1 = document.getElementById("totalMortgage");
    const output = document.createElement("h3");
    output.textContent = 'Lifetime Total = $' + formattedTotal;
    calculationDiv1.appendChild(output);
}


function CalculateRemainder(){
    clearExisting("remainingMortgage");

    const current = Number(document.getElementById("mortgage2").value);
    const repayment = Number(document.getElementById("repayment2").value);

    const intRateInput = document.getElementById("int-rate2").value.trim();

    const validNumberRegex = /^-?\d+(\.\d+)?$/;

    if (!validNumberRegex.test(intRateInput)){
        showError("Please enter a valid number for 'Annual Interest Rate'", "remainingMortgage");
        return;
    }
    const intRate = Number(intRateInput)/100;

    const years = Number(document.getElementById("years2").value);
    const months = years*12;
    let remaining = current;

    if (isNaN(current) || current <=0){
        showError("Please enter a positive number for 'Current Remaining Mortgage'", "remainingMortgage");
        return;
    }

     if (isNaN(repayment) || repayment <=0){
        showError("Please enter a positive number for 'Repayment per Month'", "remainingMortgage");  
        return;
    }

     if (isNaN(years) || years <=0){
        showError("Please enter a positive number for 'Number of Years'", "remainingMortgage");  
        return;
    }

    for(let i=0; i<months; i++){
        remaining = remaining*(1+intRate/12)-repayment;
    }

   const formattedRemainder = formatValue(remaining, 2);

    const calculationDiv2 = document.getElementById("remainingMortgage");
    const output = document.createElement("h3");
   output.textContent = 'Remaining Mortgage after ' + years + ' years = $' + formattedRemainder;
    calculationDiv2.appendChild(output);
}


function CalculateTime(){
    clearExisting("remainingTime");
    clearExisting("mortgageTable");
    const mortgage = Number(document.getElementById("mortgage3").value);
    const repayment = Number(document.getElementById("repayment3").value);

    const intRateInput = document.getElementById("int-rate3").value.trim();
    const validNumberRegex = /^-?\d+(\.\d+)?$/; 
    if (!validNumberRegex.test(intRateInput)){
        showError("Please enter a valid number for 'Annual Interest Rate'", "remainingTime");
        return;
    }

    const intRate = Number(intRateInput) / 100;
    let tableHTML = '<table role="table" aria-label="Mortgage Repayment Summary">';
    tableHTML+= `<tr><th>Year</th><th>Remaining Mortgage</th></tr>`;

    if (isNaN(mortgage) || mortgage <=0){
        showError("Please enter a positive number for 'Current Remaining Mortgage'", "remainingTime");
        return;
    }

      if (isNaN(repayment) || repayment <=0){
        showError("Please enter a positive number for 'Repayment per Month'", "remainingTime");
        return;
    }

    let monthCounter = 0;
    let remaining = mortgage;

    if (intRate < 0){
            showError("Negative interest rates aren't supported.", "remainingTime");
            return;
        }

    while (remaining > 0){
        remaining = remaining*(1+intRate/12)-repayment;
        if (remaining >= mortgage){
            showError("At this rate, you will never pay off your mortgage :(", "remainingTime");
            return;
        }

        monthCounter++;


        if (monthCounter%12 === 0){
            tableHTML+= `<tr><td>${monthCounter/12}</td>
            <td>$${formatValue(remaining,2)}</td></tr>`;
        }
    }

    tableHTML+= "</table>";
    
    const calculationDiv3 = document.getElementById("remainingTime");
    const output = document.createElement("h3");

    if (monthCounter > 1000){
        showError("You have over 100 years left on your mortgage. Please save yourself :(", "remainingTime");
        return;
    }

    const yearsLeft = Math.floor(monthCounter / 12);
    const monthsLeft = Math.ceil(monthCounter%12);

    output.textContent = "You have around " + yearsLeft + " years and " + monthsLeft + " months left on your mortgage!";
    calculationDiv3.appendChild(output);
    document.getElementById("mortgageTable").innerHTML = tableHTML;

}


function showError(message, container){
    const output = document.getElementById(container);
    const error1 = document.createElement("p");
    error1.textContent = message;
    error1.style.color = "red";
    error1.style.fontWeight = "bold";
    output.appendChild(error1);
}


function clearExisting(resultContainer){
    const clearA = document.getElementById(resultContainer);
    clearA.innerHTML = '';
}


function formatValue(value, decimals){
    const intermediateValue = value.toFixed(decimals);
    const formattedTotal = Number(intermediateValue).toLocaleString(undefined, {minimumFractionDigits:decimals});
    return formattedTotal;
}

