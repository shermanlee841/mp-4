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

async function ArtworkList() {
    let data: ArtworkData | null = null;

    try {
        data = await getArtworks();
    } catch {
        data = null;
    }

    if (!data) {
        return <p>Unable to retrieve artwork from API.</p>;
    }


}