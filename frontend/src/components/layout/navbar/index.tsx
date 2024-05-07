import Logo from "../logo";
import Menu from "./components/menu";
import Search from "./components/search";
import MobileNavbar from "./components/mobile-navbar";
import UserButton from "./components/user-button";

export default function Navbar() {
  return (
    <header
      id="navbar"
      className="container h-20 flex items-center justify-end md:justify-between"
    >
      <Logo className="hidden md:flex" />

      <Menu className="hidden md:flex" />

      <div className="hidden md:flex items-center">
        <Search />

        <UserButton />
      </div>

      <MobileNavbar className="md:hidden" />
    </header>
  );
}
