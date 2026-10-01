export function formatMoney(product) {
    return `$${(product / 100).toFixed(2)}`
}