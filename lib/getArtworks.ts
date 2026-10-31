"use server";

export async function getArtworks() {
    const apiKey = process.env.HARVARD_API_KEY;
    if (!apiKey) {
        throw new Error("Missing api key");
    }

    const response = await fetch(
        `https://api.harvardartmuseums.org/object?apikey=${apiKey}&size=10`
    );

    if (!response.ok) {
        throw new Error("Unable to retrieve artwork from API");
    }

    return response.json();
}