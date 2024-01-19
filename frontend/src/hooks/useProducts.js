import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_PRODUCTS } from "../const";
import productsService from "../server/productsService";

const useProducts = () =>
  useQuery({
    queryKey: CACHE_KEY_PRODUCTS,
    queryFn: productsService.getAll,
    staleTime: 1000,
  });

export default useProducts;
