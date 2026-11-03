import { useMemo } from "react";
import products from "../../data/products";

export default function useSearch(query) {

  const results = useMemo(() => {

    if (!query || query.trim() === "") {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();


    return products
      .map((product) => {

        let score = 0;


        // Product name priority
        if (
          product.name
            .toLowerCase()
            .includes(searchTerm)
        ) {
          score += 10;
        }


        // Brand
        if (
          product.brand
            .toLowerCase()
            .includes(searchTerm)
        ) {
          score += 8;
        }


        // Category
        if (
          product.category
            .toLowerCase()
            .includes(searchTerm)
        ) {
          score += 6;
        }


        // Seller
        if (
          product.seller
            .toLowerCase()
            .includes(searchTerm)
        ) {
          score += 4;
        }


        // SKU
        if (
          product.sku
            .toLowerCase()
            .includes(searchTerm)
        ) {
          score += 3;
        }


        return {
          ...product,
          score,
        };

      })

      .filter(product => product.score > 0)

      .sort(
        (a,b) => b.score - a.score
      );

  }, [query]);


  return results;
}