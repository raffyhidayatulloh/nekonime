import React from "react";

const Header = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="font-bold text-2xl">NekoNime</span>
          </a>
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <a href="/home" className="text-xl font-semibold text-white">
            Home <span aria-hidden="true">&nbsp;&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
