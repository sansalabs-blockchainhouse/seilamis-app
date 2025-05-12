import { RaffleType } from "@/types";
import { formatNumber } from "./formatNumber";

export function getRafflePricePolygon(
  type: RaffleType,
  values: number[]
): string {
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
      return "Invalid Raffle Type";
  }
}

export function getRafflePriceBase(
  type: RaffleType,
  value: number,
  paymentToken: string
): string {
  switch (type) {
    case RaffleType.Normal:
      return `${value} ETH`;
    case RaffleType.Token:
      switch (paymentToken) {
        case "0x2133031F5aCbC493572c02f271186F241cd8D6a5":
          return `${formatNumber(value)} $MRKT`;
        case "0x17d70172C7C4205bd39ce80F7f0ee660B7Dc5A23":
          return `${formatNumber(value)} $DIMES`;
        case "0x1bc0c42215582d5A085795f4baDbaC3ff36d1Bcb":
          return `${formatNumber(value)} $CLANKER`;
        case "0xc91B23eA2A519175FF31488254263dAFeaC7017C":
          return `${formatNumber(value)} $TEST`;
        case "0x22aF33FE49fD1Fa80c7149773dDe5890D3c76F3b":
          return `${formatNumber(value)} $BANKR`;
        case "0x2531ec1720E5d1bC82052585271D4BE3f43E392F":
          return `${formatNumber(value)} $BOBR`;
        default:
          return `${formatNumber(value)} TOKEN`;
      }
    default:
      return "Invalid Raffle Type";
  }
}
