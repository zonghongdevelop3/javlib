// import React, { useState, useEffect } from "react";

// function Card({ value, all }) {
//   const [qty, setQty] = useState([]);
//   const excludeColumns = [];

//   useEffect(() => {
//     const Value = value.toLocaleUpperCase().trim();
//     const suggestMovie = all?.filter((item) => {
//       return Object?.keys(item)?.some((key) =>
//         excludeColumns.includes(key)
//           ? false
//           : item[key]?.toString().toLocaleUpperCase().includes(Value)
//       );
//     });
//     setQty(suggestMovie?.length);
//   }, [value, all]);

//   return (
//     <div>
//       <div>{value}</div>
//       <div>{}</div>
//     </div>
//   );
// }

// export default Card;
import React from "react";

function Card({ value }) {
  return <div>{value}</div>;
}

export default Card;
