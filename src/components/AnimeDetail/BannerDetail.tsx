import Image from "next/image";
import React from "react";

interface BannerDetailProps { bannerImage: string; }

const BannerDetail: React.FC<BannerDetailProps> = ({ bannerImage }) => {
  if (!bannerImage) return null;

  return (
    <div className="relative w-full h-38 sm:h-54 md:h-62 lg:h-70 xl:h-86 overflow-hidden rounded-lg shadow-lg">
        <Image
          src={bannerImage}
          alt="Banner Image"
          fill
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/70 to-transparent" />
    </div>
  );
};

export default BannerDetail;
