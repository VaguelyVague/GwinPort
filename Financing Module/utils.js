export function generateId(prefix = "ID") {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP"
  }).format(amount);
}