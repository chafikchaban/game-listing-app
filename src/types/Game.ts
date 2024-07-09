export interface Game {
    id: number;
    title: string;
    iconURL: string;
    rating: number;
    isFavourite?: boolean;
}

export interface GameDetailsPayload {
    id: number;
    title: string;
    iconURL: string;
    bannerURL: string;
    description: string;
    rating: number;
    isFavourite?: boolean;
}