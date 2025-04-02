export function formatNumber(numero: number) {
    if (numero >= 1000) {
        const numeroFormatado = (numero / 1000).toFixed(1);
        return numeroFormatado.endsWith(".0")
            ? numeroFormatado.slice(0, -2) + "k"
            : numeroFormatado + "k";
    } else {
        return numero
    }
}

