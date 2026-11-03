import beauty from "../assets/products/beauty/beauty products.png";
import craft from "../assets/products/crafts/Craftface.png";
import smartphone from "../assets/products/electronics/smartphone.png";
import dress from "../assets/products/fashion/ankara-dress.png";
import fruits from "../assets/products/groceries/fruits.png";


const products = [

  {
    id: 1,

    name: "Beauty Care Collection",

    slug: "beauty-care-collection",

    category: "Beauty",

    brand: "CraftFace",

    seller: "AfriMarket Beauty",

    sku: "BEAUTY001",

    image: beauty,

    price: 25.99,

    oldPrice: 35.99,

    discount: 28,

    rating: 4.8,

    reviews: 156,

    stock: 25,

    status: "In Stock",

    delivery: "Free Delivery",

    badge: "Best Seller",

    featured: true,

    bestSeller: true,

    trending: true,

    newArrival: false,

    flashSale: true,

  },


  {
    id: 2,

    name: "African Craft Face Product",

    slug: "african-craft-face",

    category: "Crafts",

    brand: "AfriCraft",

    seller: "African Handmade Store",

    sku: "CRAFT001",

    image: craft,

    price: 15.99,

    oldPrice: 20.99,

    discount: 24,

    rating: 4.6,

    reviews: 89,

    stock: 40,

    status: "In Stock",

    delivery: "Fast Delivery",

    badge: "Trending",

    featured: true,

    bestSeller: false,

    trending: true,

    newArrival: true,

    flashSale: false,

  },


  {
    id: 3,

    name: "Smartphone",

    slug: "smartphone",

    category: "Electronics",

    brand: "SmartTech",

    seller: "Afri Electronics",

    sku: "ELEC001",

    image: smartphone,

    price: 299.99,

    oldPrice: 349.99,

    discount: 14,

    rating: 4.9,

    reviews: 340,

    stock: 15,

    status: "In Stock",

    delivery: "Free Delivery",

    badge: "Featured",

    featured: true,

    bestSeller: true,

    trending: true,

    newArrival: false,

    flashSale: true,

  },


  {
    id: 4,

    name: "Ankara African Dress",

    slug: "ankara-african-dress",

    category: "Fashion",

    brand: "African Fashion",

    seller: "Afri Fashion Hub",

    sku: "FASH001",

    image: dress,

    price: 45.99,

    oldPrice: 60.99,

    discount: 25,

    rating: 4.7,

    reviews: 210,

    stock: 30,

    status: "In Stock",

    delivery: "Available Nationwide",

    badge: "New Arrival",

    featured: false,

    bestSeller: true,

    trending: true,

    newArrival: true,

    flashSale: false,

  },


  {
    id: 5,

    name: "Fresh Tropical Fruits",

    slug: "fresh-tropical-fruits",

    category: "Groceries",

    brand: "Fresh Africa",

    seller: "Farm Direct",

    sku: "GROC001",

    image: fruits,

    price: 12.99,

    oldPrice: 18.99,

    discount: 32,

    rating: 4.9,

    reviews: 420,

    stock: 50,

    status: "In Stock",

    delivery: "Same Day Delivery",

    badge: "Best Seller",

    featured: true,

    bestSeller: true,

    trending: false,

    newArrival: true,

    flashSale: true,

  }

];


export default products;