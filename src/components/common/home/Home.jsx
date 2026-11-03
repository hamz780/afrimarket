import Navbar from "../Navbar";
import Hero from "./Hero/Hero";
import Categories from "./Categories";
import FlashSale from "./FlashSale";
import FeaturedProducts from "./FeaturedProducts";
import BestSellers from "./BestSellers";
import Trendingproducts from "./Trendingproducts";
import NewArrival from "./NewArrival";
import Brands from "./Brands";
import Benefits from "./Benefits";
import Newsletter from "./Newsletter";
import Footer from "../Footer/Footer";

export default function Home() {
  return (
    <>

      <Navbar />

      <Hero />

      <Categories />

      <FlashSale />

      <FeaturedProducts />

      <BestSellers />

      <Trendingproducts />

      <NewArrival />

      <Brands />

      <Benefits />

      <Newsletter />

      <Footer />

    </>
  );
}