// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import magnets from "../../data/magnets.json";
export default async function handler(req, res) {
  const { id } = JSON.parse(req.body);
  const excludeColumns = [];
  const Value = id.toLocaleUpperCase().trim();

  const movieRes = await fetch(process.env.NEXT_PUBLIC_BASE_MOVIE_URL);
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
        : item[key]?.toString().toLocaleUpperCase().includes(Value)
    );
  });
  // const magnetsLink = magnets?.filter((item) => {
  //   return Object?.keys(item)?.some((key) =>
  //     excludeColumns.includes(key)
  //       ? false
  //       : item[key]?.toString().toLocaleUpperCase().includes(Value)
  //   );
  // });

  res.status(200).json({ movies: filteredData });
}
