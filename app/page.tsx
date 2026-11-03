import { Suspense } from "react";
import { getArtworks } from "../lib/getArtworks";

type Artwork = {
    id: number;
    title: string;
    dated?: string;
    medium?: string;
    people?: {
        name: string;
    }[];
};

type ArtworkData = {
    records: Artwork[];
};

a