import { movieIdrray } from "../../config";
export default async function handler(req, res) {
  const { id } = JSON.parse(req.body);
  const excludeColumns = [];
  const Value = id.toLocaleUpperCase().trim();
  const filterMovieId = (id) => {
    let newid;
    if (id.length === 7) {
      const slieId = id.slice(0, 3);
      const IdFilter = slieId.toLocaleUpperCase().trim();
      newid = movieIdrray.filter((id) => id.id.includes(IdFilter));
      return newid;
    }
    if (id.length === 8) {
      const slieId = id.slice(0, 4);
      const IdFilter = slieId.toLocaleUpperCase().trim();
      newid = movieIdrray.filter((id) => id.id.includes(IdFilter));
      return newid;
    }
    if (id.length === 9) {
      const slieId = id.slice(0, 5);
      const IdFilter = slieId.toLocaleUpperCase().trim();
      newid = movieIdrray.filter((id) => id.id.includes(IdFilter));
      return newid;
    }
  };
  const movieIdinput = filterMovieId(id);

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

  const sortData = newAllData
    .slice()
    .sort(
      (b, a) =>
        new Date(a?.releasedate).getTime() - new Date(b?.releasedate).getTime()
    );
  const filteredData = sortData?.filter((item) => {
    return Object?.keys(item)?.some((key) =>
      excludeColumns.includes(key)
        ? false
        : item[key]?.toString().toLocaleUpperCase().includes(Value)
    );
  });
  const suggestInput = filteredData[0]?.actor.toLocaleUpperCase().trim();
  const suggestMovie = sortData?.filter((item) => {
    return Object?.keys(item)?.some((key) =>
      excludeColumns.includes(key)
        ? false
        : item[key]?.toString().toLocaleUpperCase().includes(suggestInput)
    );
  });

  res.status(200).json({ movies: filteredData, suggest: suggestMovie });
}
