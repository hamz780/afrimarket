import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import initialProducts from "../data/products";

const ProductContext = createContext();

export function ProductProvider({ children }) {

  const [products, setProducts] = useState(() => {

    const savedProducts = localStorage.getItem("afrimarket_products");

    if (savedProducts) {
      return JSON.parse(savedProducts);
    }

    return initialProducts;

  });

  useEffect(() => {

    localStorage.setItem(
      "afrimarket_products",
      JSON.stringify(products)
    );

  }, [products]);

  /* =========================
     ADD PRODUCT
  ========================= */

  const addProduct = (product) => {

    const newProduct = {

      id: Date.now(),

      featured: false,

      trending: false,

      bestSeller: false,

      rating: 5,

      reviews: 0,

      image:
        product.image ||
        "/images/products/default.png",

      ...product,

    };

    setProducts((current) => [
      newProduct,
      ...current,
    ]);

  };

  /* =========================
     UPDATE PRODUCT
  ========================= */

  const updateProduct = (id, updatedProduct) => {

    setProducts((current) =>
      current.map((product) =>
        product.id === id
          ? {
              ...product,
              ...updatedProduct,
            }
          : product
      )
    );

  };

  /* =========================
     DELETE PRODUCT
  ========================= */

  const deleteProduct = (id) => {

    setProducts((current) =>
      current.filter(
        (product) => product.id !== id
      )
    );

  };

  /* =========================
     GET PRODUCT BY ID
  ========================= */

  const getProductById = (id) => {

    return products.find(
      (product) =>
        String(product.id) === String(id)
    );

  };

  /* =========================
     FEATURED PRODUCTS
  ========================= */

  const featuredProducts = useMemo(() =>

    products.filter(
      (product) => product.featured
    )

  , [products]);

  return (

    <ProductContext.Provider

      value={{

        products,

        featuredProducts,

        addProduct,

        updateProduct,

        deleteProduct,

        getProductById,

      }}

    >

      {children}

    </ProductContext.Provider>

  );

}

export function useProducts() {

  return useContext(ProductContext);

}