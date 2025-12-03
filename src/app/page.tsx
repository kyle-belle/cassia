import Image from "next/image";
import PhotoGallery from "./_components/PhotoGallery";
import { BASE_PATH } from "./values";

const resolutions = [
  { res: 1920, maxWidth: null },
  { res: 1600, maxWidth: 900 },
];
const formats = [
  { extension: "webp", mime: "image/webp" },
  { extension: "jpg", mime: "image/jpeg" },
];

const lowestRes = resolutions[resolutions.length - 1];
const highestRes = resolutions[0];

const photos = [
  { name: "IMG_0521", hero: true, alt: "Private Pool" },
  { name: "IMG_0536", alt: "Manicured Garden Walkway" },
  { name: "IMG_0690", alt: "Private Patio & Seating Area" },
  { name: "IMG_0734", alt: "Outdoor Dining Area" },
  { name: "IMG_1031", alt: "Living Room / Family Room" },
  { name: "IMG_0553", alt: "Kitchen Area" },
  { name: "IMG_0523", alt: "Pool & Garden View" },
];

const heroImage = photos.find((p) => p.hero) || photos[0];

const amenities = [
  "4 bedrooms • Sleeps 8",
  "Private pool",
  "Ocean / hillside view",
  "Fast Wi-Fi",
  "Full kitchen",
  "A/C in all rooms",
  "Parking on-site",
  "10 min to beach",
];

const email = "wniles@caribsurf.com";
const phone = "+1 (246) 264-1518";

export default function Home() {
  return (
    <div>
      <section className="relative">
        <div className="absolute inset-0">
          <picture>
            {resolutions.map(
              (w) =>
                formats.map((f) => (
                  <source
                    key={`${w.res}-${f.extension}`}
                    srcSet={`${BASE_PATH}/images/${w.res}/${heroImage?.name}.${f.extension}`}
                    type={f.mime}
                    media={
                      w.maxWidth ? `(max-width: ${w.maxWidth}px)` : undefined
                    }
                  />
                ))
              // <>
              //   <source
              //     key={w.res}
              //     srcSet={`/images/${w.res}/IMG_0521.jpg`}
              //     type="image/jpeg"
              //     media={
              //       w.maxWidth ? `(max-width: ${w.maxWidth}px)` : undefined
              //     }
              //   />
              //   <source
              //     key={w.res}
              //     srcSet={`/images/${w.res}/IMG_0521.webp`}
              //     type="image/webp"
              //     media={
              //       w.maxWidth ? `(max-width: ${w.maxWidth}px)` : undefined
              //     }
              //   />
              // </>
            )}
            <Image
              src={`${BASE_PATH}/images/${lowestRes.res}/${heroImage?.name}.jpg`}
              alt="Villa hero"
              fill
              priority
              className="object-cover opacity-70"
            />
          </picture>
          {/* <Image
            src="/images/IMG_0602.GIF"
            alt="Villa hero"
            fill
            priority
            className="object-cover opacity-70"
          /> */}
          {/* <video
            src="/images/IMG_0602.mp4"
            muted
            autoPlay
            loop
            playsInline
            controls={false}
            className="object-cover opacity-70 absolute inset-0 h-full w-full"
          /> */}
          <div className="absolute inset-0 bg-linear-to-b from-zinc-950/40 via-zinc-950/55 to-zinc-950" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-20">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Available for reservations
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              A private villa designed for slow mornings and golden sunsets.
            </h1>
            <p className="mt-4 text-zinc-200">
              Photos, details, and an easy way to reach us—everything you need
              to book your stay.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-2xl bg-white px-5 py-3 font-medium text-zinc-950 hover:bg-zinc-100"
              >
                Inquire / Reserve
              </a>
              <a
                href="#gallery"
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-medium text-white hover:bg-white/10"
              >
                View gallery
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 text-sm text-zinc-200 sm:grid-cols-4">
              <Stat label="Bedrooms" value="4" />
              <Stat label="Sleeps" value="8" />
              <Stat label="Pool" value="Private" />
              <Stat label="Wi-Fi" value="Fast" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Photo gallery
            </h2>
            <p className="mt-2 text-zinc-300">A quick look around the villa.</p>
          </div>
          <a
            href="#contact"
            className="hidden rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-100 hover:bg-white/10 sm:inline-flex"
          >
            Ask about dates
          </a>
        </div>

        <PhotoGallery
          photos={photos}
          resolutions={resolutions}
          formats={formats}
          lowestRes={lowestRes}
          highestRes={highestRes}
        />
      </section>

      {/* Details */}
      <section id="details" className="border-t border-white/10 bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-semibold tracking-tight">
                Stay details
              </h2>
              <p className="mt-3 text-zinc-300">
                Perfect for families, couples, or small groups—quiet, private,
                and close to everything.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {amenities.map((a) => (
                  <div
                    key={a}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200"
                  >
                    {a}
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold">House rules</h3>
                <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-zinc-300">
                  <li>No smoking indoors</li>
                  <li>Quiet hours after 10pm</li>
                  <li>Respect neighbors + property</li>
                </ul>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold">Location</h3>
                <p className="mt-2 text-sm text-zinc-300">
                  In the heart of Holetown (near beaches, restaurants, etc).
                </p>

                <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
                  {/* Replace with a real embed if you want */}
                  <div className="flex aspect-16/10 lg:aspect-square items-center justify-center text-sm text-zinc-400">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124310.9085189623!2d-59.77972269058225!3d13.180304921553187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c43f0686f884d23%3A0xf93f30fc1d92c6bf!2sVilla%20Cassia!5e0!3m2!1sen!2s!4v1764740909571!5m2!1sen!2s"
                      width="600"
                      style={{ border: 0, height: "100%", width: "100%" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 pt-14">
          <div className="grid gap-10">
            <div className="">
              <h2 className="text-2xl font-semibold tracking-tight">
                Contact / reservation
              </h2>
              <p className="mt-3 text-zinc-300">
                Send dates + guest count and we&apos;ll confirm availability.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <ContactLine label="Email" value={email} />
                <ContactLine label="Phone / WhatsApp" value={phone} />
                <ContactLine
                  label="Location"
                  value="Holetown / St. James, Barbados"
                />
              </div>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-300">
                <p className="font-medium text-zinc-100">Tip</p>
                <p className="mt-2">
                  Include your preferred dates, number of guests, and any
                  special requests (airport pickup, chef, etc.).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="mt-1 text-lg font-semibold text-zinc-100">{value}</div>
    </div>
  );
}

function ContactLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="mt-1 text-sm text-zinc-100">{value}</div>
    </div>
  );
}

// function Field({
//   label,
//   name,
//   placeholder,
//   type = "text",
// }: {
//   label: string;
//   name: string;
//   placeholder?: string;
//   type?: string;
// }) {
//   return (
//     <label className="text-sm text-zinc-200">
//       {label}
//       <input
//         name={name}
//         type={type}
//         placeholder={placeholder}
//         className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/40 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 outline-none ring-0 focus:border-white/20"
//       />
//     </label>
//   );
// }
