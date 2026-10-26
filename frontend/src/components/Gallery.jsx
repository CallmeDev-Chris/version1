// Add your own images here — this is the "space left in code" for the gallery.
// Fill GALLERY_IMAGES with real image URLs/imports, in the order you want them to appear.
// Nothing renders here until real images are added — no placeholder tiles.
const GALLERY_IMAGES = [
  {
    src: '/public/hero-bg.jpg', alt: 'Chris King Music'
  }, 
 
  { src: './public/capture.jpg', alt: 'Chris King Code'},
  { src: './public/capture.jpg', alt: 'Chris King Code'},

  {
    src: '/public/hero-bg.jpg', alt: 'Chris King Music'
  },
 ]; // e.g. [{ src: '/images/shot1.jpg', alt: 'Chris King Music UI' }, ...]

export default function Gallery() {
  return (
    <section id="gallery" className="max-w-[1240px] mx-auto px-6 md:px-10 py-32 md:py-40">
      <div className="flex items-baseline gap-4 mb-14">
        <span className="mono text-gold text-sm">04</span>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Gallery</h2>
        <div className="flex-1 h-px bg-line ml-2" />
      </div>

      {GALLERY_IMAGES.length === 0 ? (
        <div className="mono text-[11px] text-faint border border-dashed border-line rounded-sm p-10 text-center tracking-wide">
          No images yet — add entries to GALLERY_IMAGES in src/components/Gallery.jsx
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 [&:has(.g-item:hover)_.g-item:not(:hover)]:opacity-50">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              className="g-item relative aspect-square overflow-hidden rounded-sm border border-line bg-elev cursor-none transition-all duration-500 hover:scale-[1.18] hover:z-10 hover:border-gold hover:shadow-2xl"
            >
              <img src={img.src} alt={img.alt || `Gallery image ${i + 1}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
