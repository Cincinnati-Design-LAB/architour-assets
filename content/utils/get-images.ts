import { cloudinary } from "./client";

export type CloudinaryImage = {
  /** Cloudinary ID value */
  publicId: string;
  /** Transformed URL for square thumbnail to use in Stackbit modal */
  thumbUrl: string;
};

type CloudinaryImagePage = {
  /** Page number to use in the UI */
  pageNumber: number;
  /** Array of images on the current page */
  images: CloudinaryImage[];
};

const PAGE_SIZE = 4;

function transformImage(image: any): CloudinaryImage {
  return {
    publicId: image.public_id,
    thumbUrl: cloudinary.url(image.public_id, {
      transformation: "stackbit_modal_thumb",
      secure: true,
    }),
  };
}

export async function getPaginatedImages(
  pages: CloudinaryImagePage[] = [],
  next_cursor?: string
): Promise<CloudinaryImagePage[]> {
  const response = await cloudinary.api.resources({
    resource_type: "image",
    max_results: PAGE_SIZE,
    next_cursor,
  });

  pages.push({
    images: response.resources.map(transformImage),
    pageNumber: pages.length + 1,
  });

  if (response.next_cursor) {
    return getPaginatedImages(pages, response.next_cursor);
  }

  return pages;
}

// async function getPaginatedImages(): Promise<CloudinaryImagePage[]> {
// const pages: CloudinaryImagePage[] = [];

//   let response = await getImagePage();

//   // Run again if next_cursor. Otherwise, return the pages.
//   if (response.next_cursor) {
//     return getImagePage(pages, response.next_cursor);
//   }

//   return pages;

//   // return cloudinaryImages.map(transformImage);
// }

// async function paginateImages(): Promise<CloudinaryImagePage[]> {
//   return await getImagePage([]);

// }

// export async function getImages(): Promise<CloudinaryImage[]> {
//   const paginatedImages = await getPaginatedImages([]);

//   // console.log(cloudinaryImages);
//   // const images = cloudinaryImages.resources.map(
//   //   transformImage
//   // ) as CloudinaryImage[];
//   // return images;
// }
