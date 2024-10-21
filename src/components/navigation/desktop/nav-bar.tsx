import NavBarBrand from "./nav-bar-brand";
import NavBarButtons from "./nav-bar-buttons";
import NavBarTabs from "./nav-bar-tabs";

function NavBar() {
  return (
    <div className="nav-bar__container">
      <nav className="nav-bar">
        <NavBarBrand />
        <NavBarTabs />
        <NavBarButtons />
      </nav>
    </div>
  );
};

export default NavBar;
