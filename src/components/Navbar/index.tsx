import React from "react";

const Navbar = () => {
  return (
    <header className="font-poppins fixed top-0 left-0 w-full z-50">
      <nav className="bg-background text-foreground p-4 flex justify-between items-center shadow-md border-b border-gray-700">
        <a href="/home" className="text-2xl font-bold text-white">Nekonime</a>
        <div className="space-x-6">
          <a href="#" className="hover:text-nekonime-accent-blue">
            Anime
          </a>
          <a href="#" className="hover:text-nekonime-accent-blue">
            Manga
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
