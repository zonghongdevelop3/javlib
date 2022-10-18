// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { show_per_page } from "../../config";
import { pageCount, filterAllData } from "../../utils/helpers";

export default async function handler(req, res) {
  const { searchterm } = JSON.parse(req.body);
  const Value = searchterm.toLocaleUpperCase().trim();

  const movieRes = await fetch(process.env.NEXT_PUBLIC_BASE_ALL_MOVIE_URL);
  const data = await movieRes.json();
  const sortData = data
    .slice()
    .sort(
      (b, a) =>
        new Date(a?.releasedate).getTime() - new Date(b?.releasedate).getTime()
    );

  const filteredData = filterAllData(sortData, Value);

  const totalMoviesResult = filteredData?.length;
  let totalMovieCount = pageCount(totalMoviesResult);
  let totalMovie = filteredData.slice(0, show_per_page);

  res
    .status(200)
    .json({ movies: totalMovie, totalMovieCount, totalMoviesResult });
}
