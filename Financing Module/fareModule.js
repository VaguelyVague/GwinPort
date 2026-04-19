import { formatCurrency } from "./utils.js";

export function calculateFare(bookingDetails) {
  const {
    baseFare,
    passengers = 1,
    travelClass = "Economy",
    extraBaggage = 0,
    insurance = false
  } = bookingDetails;

  let classMultiplier = 1;

  switch (travelClass) {
    case "Business":
      classMultiplier = 1.5;
      break;
    case "First Class":
      classMultiplier = 2;
      break;
    default:
      classMultiplier = 1;
  }

  const baggageFee = extraBaggage * 200;
  const insuranceFee = insurance ? 150 : 0;

  const subtotal = (baseFare * passengers * classMultiplier) + baggageFee + insuranceFee;
  const vat = subtotal * 0.12;
  const total = subtotal + vat;

  return {
    subtotal,
    vat,
    total,
    formattedSubtotal: formatCurrency(subtotal),
    formattedVat: formatCurrency(vat),
    formattedTotal: formatCurrency(total)
  };
}