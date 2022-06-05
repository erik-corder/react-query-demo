import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "../utils/axios-util";

const fetchSuperHeroes = () => {
  return request({url: '/superheroes'});
};

const addSuperHero = (hero) => {
  return request({url: '/superheroes', method: 'POST', data: hero});
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    //   cacheTime: 5000,
    //   staleTime: 30000,
    //   refetchOnMount: true,
    //   refetchOnWindowFocus: true,
    //   refetchInterval: 1000,
    //   refetchIntervalInBackground: 1000,
    //   enabled: false,
    onSuccess,
    onError,
    //   select: (data) => {
    //     const superHeroNames = data.data.map((hero) => hero.name);
    //     return superHeroNames;
    //   },
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries("super-heroes");
    //   queryClient.setQueriesData("super-heroes", (prevData) => {
    //     return {
    //       ...prevData,
    //       data: [...prevData.data, data.data],
    //     };
    //   });
    // },
    onMutate: async (newHero) => {
      queryClient.cancelMutations("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueriesData("super-heroes", (prevData) => {
        return {
          ...prevData,
          data: [
            ...prevData.data,
            { id: prevData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return {
        previousHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
