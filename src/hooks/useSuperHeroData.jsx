import axios from "axios";
import { useQuery, userQueryClient } from "react-query";

const fetchSuperHeroes = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  const queryClient = userQueryClient();
  return useQuery(["super-hero", heroId], fetchSuperHeroes, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((hero) => hero.id === parseInt(heroId));

      if (hero) {
        return {
          data: hero,
        };
      }else{
          return undefined;
      }
    },
  });
};
