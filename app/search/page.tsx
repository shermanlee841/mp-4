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

type SearchPageProps = {
    searchParams: Promise<{
        q?: string;
    }>;
};

async function SearchResults({
                                 searchParams,
                             }: SearchPageProps) {
    const params = await searchParams;
    const query = params.q || "";

    let data: ArtworkData | null = null;

    if (query) {
        try {
            data = await getArtworks(query);
        } catch {
            data = null;
        }
    }

    return (
        <>
            {query && data ? (
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
            ) : query ? (
                <p>Unable to retrieve artwork from API.</p>
            ) : (
                <p>Enter a search term above.</p>
            )}
        </>
    );
}

export default function SearchPage({
                                       searchParams,
                                   }: SearchPageProps) {
    return (
        <main>
            <h1>Search Artwork</h1>

            <form>
                <input
                    type="text"
                    name="q"
                    placeholder="Search for artwork"
                />

                <button type="submit">Search</button>
            </form>

            {/* used suspense again because I had issue with the pre render which caused failed deployment*/}
            <Suspense fallback={<p>Loading artwork...</p>}>
                <SearchResults searchParams={searchParams} />
            </Suspense>
        </main>
    );
}