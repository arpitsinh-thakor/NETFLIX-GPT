import axios from "axios";

export default async function handler(req, res) {
  try {
    const { movieId, type } = req.query;

    let url;

    if (type === "videos" && movieId) {
      url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
    } else {
      url = "https://api.themoviedb.org/3/movie/now_playing?page=1";
    }

    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_KEY}`,
      },
      timeout: 15000,
    });

    return res.status(200).json(response.data);

  } catch (error) {
    console.error("TMDB Server Error:", error.message);

    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    return res.status(500).json({
      error: error.message || "Failed to fetch TMDB",
    });
  }
}