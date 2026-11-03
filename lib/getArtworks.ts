"use server";

export async function getArtworks(search?: string) {
    const apiKey = process.env.HARVARD_API_KEY;

    if (!apiKey) {
        throw new Error("Harvard API key is missing");
    }

    let url =
        `https://api.harvardartmuseums.org/object?apikey=${apiKey}&size=10`;

    if (search) {
        url += `&q=${encodeURIComponent(search)}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to retrieve artwork from API");
    }

    return response.json();
}