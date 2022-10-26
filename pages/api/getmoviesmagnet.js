// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const { mid, id } = JSON.parse(req.body);
  const excludeColumns = [];
  //   console.log(id);
  const Value = mid.toLocaleUpperCase().trim();

  const vid = id?.toLocaleLowerCase();
  console.log("vid", vid);
  //   console.log("vid", vid);

  const url = `https://raw.githubusercontent.com/zonghongdevelop3/javdb.io/main/data/${vid}magnets.json`;
  console.log("url", url);

  const magnetRes = await fetch(url);
  const data = await magnetRes.json();
  console.log("Value", Value);

  const filteredData = data?.filter((item) => {
    return Object?.keys(item)?.some((key) =>
      excludeColumns.includes(key)
        ? false
        : item["id"]?.toString().toLocaleUpperCase().includes(Value)
    );
  });
  console.log("filteredData", filteredData);

  res.status(200).json({ magnets: filteredData });
}
