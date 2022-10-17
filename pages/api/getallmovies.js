import { show_per_page } from "../../config";
import { pageCount } from "../../utils/helpers";

export default async function handler(req, res) {
  const movieRes = await fetch(
    "https://raw.githubusercontent.com/zonghongdevelop3/javdb.io/main/data/allmovie.json"
  );
  const data = await movieRes.json();
  let totalMovieCount = pageCount(data.length);
  const sortMovie = data
    .slice()
    .sort(
      (b, a) =>
        new Date(a?.releasedate).getTime() - new Date(b?.releasedate).getTime()
    );
  let totalMovie = sortMovie.slice(0, show_per_page);

  res.status(200).json({ movies: totalMovie, totalMovieCount });
}
