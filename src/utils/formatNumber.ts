export function formatNumber(numero: number) {
    if (numero >= 1000000) {
        const formatted = (numero / 1000000).toFixed(1);
        return formatted.endsWith(".0")
            ? formatted.slice(0, -2) + "M"
            : formatted + "M";
    } else if (numero >= 1000) {
        const formatted = (numero / 1000).toFixed(1);
        return formatted.endsWith(".0")
            ? formatted.slice(0, -2) + "k"
            : formatted + "k";
    } else {
        return numero.toString();
    }
}
