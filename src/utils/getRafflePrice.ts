import { RaffleType } from "@/types";
import { formatNumber } from "./formatNumber";

export function getRafflePrice(type: RaffleType, values: number[]): string {
    switch (type) {
        case RaffleType.Normal:
            return `${values[0]} POL`;
        case RaffleType.Token:
            return `${formatNumber(values[1])} HIT`;
        case RaffleType.NormalWithFree:
            return `${values[0]} POL | FREE`;
        case RaffleType.TokenWithFree:
            return `${formatNumber(values[1])} HIT | FREE`;
        case RaffleType.NormalOrToken:
            return `${values[0]} POL | ${formatNumber(values[1])} HIT`;
        case RaffleType.NormalOrTokenOrFree:
            return `${values[0]} POL | ${formatNumber(values[1])} HIT | 🎟️`;
        default:
            return 'Invalid Raffle Type';
    }
}