import { show_per_page } from "../../config";
import { pageCount } from "../../utils/helpers";

export default async function handler(req, res) {
  const { page } = JSON.parse(req.body);

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
  let totalMovie;
  if (Number(page) == 1) {
    totalMovie = sortMovie.slice(show_per_page, show_per_page);
  }
  if (Number(page) == 2) {
    totalMovie = sortMovie.slice(show_per_page, show_per_page * page);
  }

  if (Number(page) > 2) {
    totalMovie = sortMovie.slice(
      show_per_page * page - show_per_page,
      show_per_page * page
    );
  }
  console.log(totalMovie, totalMovieCount);
  res.status(200).json({ movies: totalMovie, totalMovieCount });
}
