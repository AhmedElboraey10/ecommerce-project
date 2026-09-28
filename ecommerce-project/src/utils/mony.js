export function formatMony(product) {
    return `$${(product / 100).toFixed(2)}`
}