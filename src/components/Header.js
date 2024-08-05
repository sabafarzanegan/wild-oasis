import React from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";

function Header() {
  return (
    <>
      <header className="border-b border-primary-900 px-8 py-5">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <Logo />
          <Navigation />
        </div>
      </header>
    </>
  );
}

export default Header;
