import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";

const fetchColors = (pageNumber) => {
  return axios.get("http://localhost:4000/colors?_limit=2&_page=" + pageNumber);
};

export const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const {
    isLoading,
    isFetching,
    data: colors,
    error,
    isError,
  } = useQuery(["colors", pageNumber], () => fetchColors(pageNumber), {
    keepPreviousData: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>
        {colors?.data.map((color) => {
          return (
            <div key={color.id}>
              <ul>
                <li>
                  <h1>{color.color}</h1>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
      <div>
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          previous Pge
        </button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4}
        >
          Next Pge
        </button>
        {isFetching && <div>Fetching...</div>}
      </div>
    </>
  );
};
