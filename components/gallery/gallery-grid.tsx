"use client";

import Image from "next/image";

interface GalleryGridProps {
  images: string[];
  folder: string;
  altPrefix?: string;
  columns?: string;
}

export default function GalleryGrid({
  images,
  folder,
  altPrefix = "Image",
  columns = "columns-2 md:columns-3 lg:columns-4",
}: GalleryGridProps) {
  return (
    <div className={`${columns} gap-3 md:gap-4`}>
      {images.map((image, index) => (
        <div
          key={image}
          className="break-inside-avoid mb-3 md:mb-4 rounded-lg overflow-hidden group cursor-pointer"
        >
          <div className="relative w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={`${folder}/${image}`}
              alt={`${altPrefix} ${index + 1}`}
              width={400}
              height={300}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

