"use client";
import Image from "next/image";
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { BASE_PATH } from "../values";

const PhotoGallery = ({
  photos,
  resolutions,
  formats,
  lowestRes,
  highestRes,
}: {
  photos: { name: string; alt: string; hero?: boolean }[];
  resolutions: { res: number; maxWidth: number | null }[];
  formats: { extension: string; mime: string }[];
  lowestRes: { res: number; maxWidth: number | null };
  highestRes: { res: number; maxWidth: number | null };
}) => {
  return (
    <LightGallery
      elementClassNames="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      plugins={[lgZoom, lgThumbnail]}
      speed={500}
    >
      {photos.map((p) => (
        <a
          href={`${BASE_PATH}/images/${highestRes.res}/${p.name}.webp`}
          key={p.name}
          data-src={`/images/${highestRes.res}/${p.name}.webp`}
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
        >
          <div className="relative aspect-4/3">
            <picture>
              {resolutions.map((w) =>
                formats.map((f) => (
                  <source
                    key={`${w.res}-${f.extension}`}
                    srcSet={`${BASE_PATH}/images/${w.res}/${p.name}.${f.extension}`}
                    type={f.mime}
                    media={
                      w.maxWidth ? `(max-width: ${w.maxWidth}px)` : undefined
                    }
                  />
                ))
              )}
              <Image
                src={`${BASE_PATH}/images/${lowestRes.res}/${p.name}.jpg`}
                data-src={`${BASE_PATH}/images/${highestRes.res}/${p.name}.webp`}
                alt={p.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03] cursor-pointer"
              />
            </picture>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-zinc-950/80 to-transparent p-4">
            <p className="text-sm text-zinc-100">{p.alt}</p>
          </div>
        </a>
      ))}
    </LightGallery>
  );
};

export default PhotoGallery;
