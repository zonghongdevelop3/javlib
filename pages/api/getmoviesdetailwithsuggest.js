// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const { id } = JSON.parse(req.body);
  const excludeColumns = [];
  const Value = id.toLocaleUpperCase().trim();

  const movieRes = await fetch(
    "https://raw.githubusercontent.com/zonghongdevelop3/javdb.io/main/data/movie.json"
  );
  const data = await movieRes.json();

  const sortData = data
    .slice()
    .sort(
      (b, a) =>
        new Date(a?.releasedate).getTime() - new Date(b?.releasedate).getTime()
    );
  const filteredData = sortData?.filter((item) => {
    return Object?.keys(item)?.some((key) =>
      excludeColumns.includes(key)
        ? false
        : item["id"]?.toString().toLocaleUpperCase().includes(Value)
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

  res.status(200).json({ movies: filteredData[0], suggest: suggestMovie });
}
