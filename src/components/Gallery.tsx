import Image from "next/image"

const photos = [
  {
    src: "/images/gallery/donation-sorting.jpg",
    alt: "Volunteers unloading donated food boxes",
  },
  {
    src: "/images/gallery/seedling.jpg",
    alt: "Hands holding a young seedling with soil",
  },
  {
    src: "/images/gallery/beach-cleanup.jpg",
    alt: "Volunteers collecting plastic trash on a beach",
  },
  {
    src: "/images/gallery/medical-volunteer.jpg",
    alt: "Doctor in a white coat checking a phone",
  },
] as const

const Gallery = () => {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-sm font-bold tracking-widest text-emerald-600 uppercase">
            Impact Gallery
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
  Snapshots of Community Change
</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
