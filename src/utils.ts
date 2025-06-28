export function clearExisting(resultContainer: string) {
  const clearA = document.getElementById(resultContainer) as HTMLElement;
  clearA.innerHTML = "";
}

export function showError(message: string, container: string) {
  const output = document.getElementById(container) as HTMLElement;
  const error1 = document.createElement("p");
  error1.textContent = message;
  error1.style.color = "red";
  error1.style.fontWeight = "bold";
  output.appendChild(error1);
}

export function formatValue(value: number, decimals: number) {
  const intermediateValue = value.toFixed(decimals);
  const formattedTotal = Number(intermediateValue).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
  });
  return formattedTotal;
}
