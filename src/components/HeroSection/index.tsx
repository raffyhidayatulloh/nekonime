import React from "react";
import Image from "next/image";
import Header from "./Header";

const HeroSection = ({ image }) => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Header />
      <h1 id="hero-title" className="sr-only">
        Welcome to NekoNime
      </h1>
      <Image
        src={image}
        alt="Image Background"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-background/80 z-0" />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-full max-w-md px-4">
          <input
            type="text"
            placeholder="Search anime..."
            aria-label="Search anime"
            className="w-full px-4 py-3 rounded-lg shadow-md bg-foreground text-background focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
