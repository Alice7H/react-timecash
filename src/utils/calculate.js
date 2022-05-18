import { convertToDate, convertMillisecondsToHour } from "./converter";

function calculateMilliseconds(endTime, startTime) {
  return (endTime.getTime() - startTime.getTime());
}

export function calculatePriceHour(endTime, startTime, serviceHour) {
  const endTimeDate = convertToDate(endTime);
  const milliseconds = calculateMilliseconds(endTimeDate, startTime);
  let hour = convertMillisecondsToHour(milliseconds);
  return serviceHour * hour;
}

export function calculateProduct(quantity, price) {
  return parseFloat((parseFloat(quantity) * parseFloat(price)).toFixed(2));
}

export function calculateTotalService(travelCost, otherCost, priceHour) {
  return parseFloat((parseFloat(travelCost) + parseFloat(otherCost) + priceHour).toFixed(2));
}

export function calculateTotalProd(products) {
  let totalProd = 0;
  products.length === 1 ? totalProd = products[0].total :
  products.length === 0 ? totalProd = 0 :
  totalProd = products.reduce((a, b) => a.total + b.total)
  return totalProd;
}

export function calculateTotal (totalService, totalProduct) {
  return parseFloat((parseFloat(totalService) + parseFloat(totalProduct)).toFixed(2));
}