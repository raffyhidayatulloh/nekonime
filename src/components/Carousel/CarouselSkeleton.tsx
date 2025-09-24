"use client";

export default function CarouselSkeleton() {
  return (
    <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-100 overflow-hidden rounded-lg shadow-lg animate-pulse bg-gray-800">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
      <div className="absolute top-4 right-4 lg:bottom-6 lg:top-auto lg:right-6 z-20 bg-gray-700/70 px-6 py-3 rounded-full" />
      <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 z-10">
        <div className="flex flex-col items-center lg:w-2/3 xl:w-1/2">
          <div className="h-6 sm:h-8 lg:h-10 xl:h-12 w-3/4 bg-gray-600 rounded mb-4" />
          <div className="flex gap-2 mb-3">
            <div className="h-5 w-16 bg-gray-700 rounded-full" />
            <div className="h-5 w-20 bg-gray-700 rounded-full" />
          </div>
          <div className="hidden md:block w-full space-y-2">
            <div className="h-4 w-full bg-gray-700 rounded" />
            <div className="h-4 w-5/6 bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}