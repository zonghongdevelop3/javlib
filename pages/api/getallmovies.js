import { show_per_page } from "../../config";
import { pageCount } from "../../utils/helpers";

export default async function handler(req, res) {
  const movieRes1 = await fetch(
    "https://raw.githubusercontent.com/zonghongdevelop3/javdb.io/main/data/allmovie1.json",
    { cache: "no-store" }
  );
  const movieRes2 = await fetch(
    "https://raw.githubusercontent.com/zonghongdevelop3/javdb.io/main/data/allmovie2.json",
    { cache: "no-store" }
  );
  const movieRes3 = await fetch(
    "https://raw.githubusercontent.com/zonghongdevelop3/javdb.io/main/data/allmovie3.json",
    { cache: "no-store" }
  );
  const movieRes4 = await fetch(
    "https://raw.githubusercontent.com/zonghongdevelop3/javdb.io/main/data/allmovie4.json",
    { cache: "no-store" }
  );

  const data1 = await movieRes1.json();
  const data2 = await movieRes2.json();
  const data3 = await movieRes3.json();
  const data4 = await movieRes4.json();

  let allData = [];

  const newAllData = allData.concat(data1, data2, data3, data4);
  let totalMovieCount = pageCount(newAllData.length);
  const sortMovie = newAllData
    .slice()
    .sort(
      (b, a) =>
        new Date(a?.releasedate).getTime() - new Date(b?.releasedate).getTime()
    );
  let totalMovie = sortMovie.slice(0, show_per_page);

  res.status(200).json({ movies: totalMovie, totalMovieCount });
}
