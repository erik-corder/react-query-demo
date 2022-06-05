import axios from "axios";
import React from "react";
import { useQueries } from "react-query";

const fetchSuperHeroes = (queryData) => {
  const heroId = queryData.queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export function DynamicParallelPage({ heroId }) {
  const queryResults = useQueries(
    heroId.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: fetchSuperHeroes,
      };
    })
  );

  console.log("queryResults", queryResults);

  return <div>DynamicParallelPage</div>;
}
