export const getUniqueValues = (data, type) => {
  if (type === "actor") {
    let unique = data.map((item) => item[type]?.split("/"));
    // let newActor = unique.split("/");
    // console.log("new actor", newActor);
    unique = unique.flat();
    console.log(unique);
    return ["all", ...new Set(unique)];
  }
  if (type === "studio") {
    let unique = data.map((item) => item[type]?.split("/"));
    // let newActor = unique.split("/");
    // console.log("new actor", newActor);
    unique = unique.flat();
    console.log(unique);
    return ["all", ...new Set(unique)];
  }
  if (type === "genre") {
    let unique = data.map((item) => item[type]?.split(" "));
    // let newActor = unique.split("/");
    // console.log("new actor", newActor);
    unique = unique.flat();
    console.log(unique);
    return ["all", ...new Set(unique)];
  }

  // if (type === "genre") {
  //   unique = unique.flat();
  // }

  // return ["all", ...new Set(unique)];
};

export const getUniqueName = (data, type) => {
  let unique = data.map((item) => item[type]);

  if (type === "name") {
    unique = unique.flat();
  }

  return [...new Set(unique)];
};

export function sortByDate(a, b) {
  return new Date(b.date) - new Date(a.date);
}

export function pageCount(number) {
  return Math.ceil(number / 12);
}

export function filterAllData(data, value) {
  const excludeColumns = [];
  const Value = value.toLocaleUpperCase().trim();

  if (Value === "") return data;
  else {
    const filteredDatas = data?.filter((item) => {
      return Object?.keys(item)?.some((key) =>
        excludeColumns.includes(key)
          ? false
          : item[key]?.toString().toLocaleUpperCase().includes(Value)
      );
    });
    const filteredData = filteredDatas
      .slice()
      .sort(
        (b, a) =>
          new Date(a?.releasedate).getTime() -
          new Date(b?.releasedate).getTime()
      );
    return filteredData;
  }
}
