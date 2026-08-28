export default async function handler(req, res) {
  try {
    const { movieId, type, query } = req.query;

    let url;

    if (type === "videos" && movieId) {
      url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
    } else if (type === "search" && query) {
      url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&include_adult=false&language=en-US&page=1`;
    } else {
      url = "https://api.themoviedb.org/3/movie/now_playing?page=1";
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("TMDB Error:", data);
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("TMDB Server Error:", error);

    return res.status(500).json({
      error: error.message || "Failed to fetch TMDB data",
    });
  }
}