"use client";
import Image from "next/image";
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-video.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import { BASE_PATH } from "../values";

const MediaGallery = ({
  media,
  resolutions,
  formats,
  lowestRes,
  highestRes,
}: {
  media: {
    name: string;
    alt: string;
    hero?: boolean;
    type: "IMAGE" | "VIDEO";
  }[];
  resolutions: { res: number; maxWidth: number | null }[];
  formats: { extension: string; mime: string }[];
  lowestRes: { res: number; maxWidth: number | null };
  highestRes: { res: number; maxWidth: number | null };
}) => {
  return (
    <LightGallery
      elementClassNames="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      plugins={[lgZoom, lgThumbnail, lgVideo]}
      speed={500}
    >
      {media.map((m) =>
        m.type === "IMAGE" ? (
          <a
            href={`${BASE_PATH}/images/${highestRes.res}/${m.name}.webp`}
            key={m.name}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
          >
            <div className="relative aspect-4/3">
              <picture>
                {resolutions.map((w) =>
                  formats.map((f) => (
                    <source
                      key={`${w.res}-${f.extension}`}
                      srcSet={`${BASE_PATH}/images/${w.res}/${m.name}.${f.extension}`}
                      type={f.mime}
                      media={
                        w.maxWidth ? `(max-width: ${w.maxWidth}px)` : undefined
                      }
                    />
                  ))
                )}
                <Image
                  src={`${BASE_PATH}/images/${lowestRes.res}/${m.name}.jpg`}
                  alt={m.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03] cursor-pointer"
                />
              </picture>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-zinc-950/80 to-transparent p-4">
              <p className="text-sm text-zinc-100">{m.alt}</p>
            </div>
          </a>
        ) : (
          <a
            key={m.name}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 block"
            data-video={`{"source": [{"src":"${BASE_PATH}/videos/${m.name}.mp4", "type":"video/mp4"}], "attributes": {"preload": false, "controls": true}}`}
          >
            <video
              src={`${BASE_PATH}/videos/${m.name}.mp4`}
              muted
              autoPlay
              loop
              playsInline
              controls={false}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03] cursor-pointer aspect-4/3 w-full"
            />
          </a>
        )
      )}
    </LightGallery>
  );
};

export default MediaGallery;
