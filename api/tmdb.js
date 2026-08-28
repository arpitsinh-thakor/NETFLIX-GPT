export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("TMDB API Error:", error);

    return res.status(500).json({
      error: "Failed to fetch movies",
    });
  }
}