import { getPaginatedImages } from "@/utils/cloudinary";
import { Image } from "@unpic/react";

export default async function StackbitModal() {
  const imagePages = await getPaginatedImages();
  // const images = imagePages[0].images;
  const images = imagePages.flatMap((page) => page.images);

  console.log(images);

  return (
    <main className="p-4">
      <div className="mb-4 text-right">
        <input type="file" id="_image-file" className="hidden" />
        <button
          id="_upload-trigger"
          className="inline-block px-6 py-2 text-white bg-blue-500">
          Upload New Image
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className="overflow-hidden transition-all duration-300 border-4 border-transparent _select-image hover:cursor-pointer hover:border-blue-300"
              data-public-id={image.public_id}
              data-width={image.width}
              data-height={image.height}
              data-url={image.url}>
              <Image
                src={image.url}
                aspectRatio={1}
                layout="fullWidth"
                alt={image.public_id}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
