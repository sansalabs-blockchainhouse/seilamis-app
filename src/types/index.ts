export interface IRaffleSei {
    id: string;
    collectionName: string;
    creator: string;
    name: string;
    image: string;
    price: number;
    startTime: string;
    endTime: string;
    winner?: string;
    ticketsSold: number;
    isVerified?: boolean;
}

export interface IRafflePolygon {
    id: string;
    collectionName: string;
    nftId: string;
    creator: string;
    name: string;
    image: string;
    price: number[];
    startTime: string;
    endTime: string;
    ticketsSold: number;
    raffleType: number;
    winner?: string;
}

export enum RaffleType {
    Normal = 0,
    Token = 1,
    NormalWithFree = 2,
    TokenWithFree = 3,
    NormalOrToken = 4,
    NormalOrTokenOrFree = 5
}