import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function PaginationNew({
  totalMovieCount,
  search,
  initial,
  currentParam,
  currentPostpage,
}) {
  let pageIntoArray = Array?.from(Array(totalMovieCount).keys());

  return (
    <nav className="w-full overflow-hidden pb-2">
      <ul className="overflow-x-scroll flex flex-row items-center justify-items-center space-x-8 mx-8">
        {pageIntoArray.map((page) => {
          return (
            <li
              key={page}
              className={`page-item p-2 mb-4 ${
                Number(currentPostpage) == Number(page + 1) &&
                "bg-gray-500 rounded-full leading-loose"
              }`}
            >
              {initial ? (
                <Link href={page === 0 ? "/" : `/basepage/${page + 1}`}>
                  <p>{page + 1}</p>
                </Link>
              ) : (
                <Link href={page === 0 ? "/allmovies/" : `/page/${page + 1}`}>
                  <p>{page + 1}</p>
                </Link>
              )}

              {search ? (
                <Link
                  href={
                    page === 0
                      ? `/searchfilter/${currentParam}`
                      : `/searchfilter/${currentParam}/page/${page + 1}`
                  }
                >
                  <p>{page + 1}</p>
                </Link>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default PaginationNew;
