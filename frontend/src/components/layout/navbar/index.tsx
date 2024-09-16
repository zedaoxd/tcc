import Logo from "../logo";
import Menu from "./components/menu";
import Search from "./components/search";
import MobileNavbar from "./components/mobile-navbar";
import UserButton from "./components/user-button";

export default function Navbar() {
  return (
    <header
      id="navbar"
      className="flex justify-end md:justify-between items-center h-20 container"
    >
      <Logo className="md:flex hidden" />

      <Menu className="md:flex hidden" />

      <div className="md:flex items-center hidden">
        <Search />

        <UserButton />
      </div>

      <MobileNavbar className="md:hidden" />
    </header>
  );
}
