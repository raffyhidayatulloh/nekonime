import React from "react";

const Page = () => {
  return (
    <header>
      <nav className="bg-nekonime-secondary text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-nekonime-primary">Nekonime</h1>
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

export default Page;
