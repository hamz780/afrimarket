import TopBar from "./TopBar";
import Navbar from "./Navbar";
import CategoryMenu from "./CategoryMenu";

import "./Header.css";

export default function Header() {
  return (
    <header className="header">

      <TopBar />

      <Navbar />

      <CategoryMenu />

    </header>
  );
}