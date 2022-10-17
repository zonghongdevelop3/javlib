import React from "react";

function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav className="w-full overflow-hidden pb-2">
      <div className="overflow-x-scroll flex flex-row items-center justify-items-center space-x-8 mx-8">
        {pageNumber.map((number) => (
          <div key={number} className="cursor-pointer hover:animate-pulse">
            <a onClick={() => paginate(number)} className="tracking-widest">
              {number}
            </a>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default Pagination;
