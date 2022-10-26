// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { show_per_page } from "../../config";
import { pageCount, filterAllData } from "../../utils/helpers";

export default async function handler(req, res) {
  const { searchterm, page } = JSON.parse(req.body);
  const Value = searchterm.toLocaleUpperCase().trim();

  const movieRes = await fetch(
    "https://raw.githubusercontent.com/zonghongdevelop3/javdb.io/main/data/allmovie.json"
  );
  const data = await movieRes.json();
  const sortData = data
    .slice()
    .sort(
      (b, a) =>
        new Date(a?.releasedate).getTime() - new Date(b?.releasedate).getTime()
    );

  const filteredData = filterAllData(sortData, Value);
  let totalMovieCount = pageCount(filteredData.length);
  const totalMoviesResult = filteredData?.length;
  let totalMovie;

  if (Number(page) == 1) {
    totalMovie = filteredData.slice(show_per_page, show_per_page);
  }
  if (Number(page) == 2) {
    totalMovie = filteredData.slice(show_per_page, show_per_page * page);
  }

  if (Number(page) > 2) {
    totalMovie = filteredData.slice(
      show_per_page * page - show_per_page,
      show_per_page * page
    );
  }

  console.log(totalMovie);
  res
    .status(200)
    .json({ movies: totalMovie, totalMovieCount, totalMoviesResult });
}
