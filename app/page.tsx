import { Suspense } from "react";
import { getArtworks } from "@/lib/getArtworks";

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

    return (
        <section>
            {data.records.map((artwork) => (
                <article key={artwork.id}>
                    <h3>{artwork.title}</h3>

                    <p>
                        <strong>Artist:</strong>{" "}
                        {artwork.people?.[0]?.name || "Unknown artist"}
                    </p>

                    <p>
                        <strong>Date:</strong>{" "}
                        {artwork.dated || "Unknown date"}
                    </p>

                    <p>
                        <strong>Medium:</strong>{" "}
                        {artwork.medium || "Unknown medium"}
                    </p>
                </article>
            ))}
        </section>
    );
}

export default function Home() {
    return (
        <main>
            <h1>Art Explorer</h1>

            <h2>Featured Artwork</h2>
            {/* had issues with pre rendering, used suspense to fix issue with the cache component */}
            <Suspense fallback={<p>Loading artwork...</p>}>
                <ArtworkList />
            </Suspense>
        </main>
    );
}