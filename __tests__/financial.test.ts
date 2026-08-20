import { formatAppCurrency, calculateYield, calculatePortfolioAllocations } from "../lib/financial";

export function runFinancialTests(): void {
  // Test 1: USD Currency Formatting
  const usdResult = formatAppCurrency(5000, "USD");
  console.assert(usdResult.includes("5,000"), "USD formatting should contain 5,000");

  // Test 2: DOP Currency Formatting
  const dopResult = formatAppCurrency(10000, "DOP", 60.5);
  console.assert(dopResult.includes("RD$"), "DOP formatting should contain RD$");

  // Test 3: Yield Calculation
  const yieldResult = calculateYield(10000, 10, 360, false);
  console.assert(yieldResult.calculatedYield === 1000, "Yield should be 1000 for 10% on 360 days");

  // Test 4: Portfolio Allocations
  const allocations = calculatePortfolioAllocations(50000, 60);
  const totalPercent = allocations.reduce((sum, item) => sum + item.percent, 0);
  console.assert(totalPercent === 100, "Allocations should total 100%");
}

// Execute assertions on import
runFinancialTests();
