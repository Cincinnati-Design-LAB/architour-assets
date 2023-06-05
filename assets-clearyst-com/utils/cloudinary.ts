import { v2 as cloudinary } from 'cloudinary';
import { IMAGE_PAGE_SIZE } from './constants';

/* ----- Cloudinary Client ----- */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

/* ----- Types ----- */

export type CloudinaryImage = {
  /** Cloudinary ID value */
  public_id: string;
  /** Full (secure) URL to image */
  url: string;
  /** Original file width */
  width: number;
  /** Original file height */
  height: number;
};

type CloudinaryImagePage = {
  /** Page number to use in the UI */
  pageNumber: number;
  /** Array of images on the current page */
  images: CloudinaryImage[];
};

function transformImage(image: any): CloudinaryImage {
  const { width, height, public_id, secure_url } = image;
  return { public_id, url: secure_url, width, height };
}

export async function getPaginatedImages(
  options: { folder?: string } = {},
  pages: CloudinaryImagePage[] = [],
  next_cursor?: string,
): Promise<CloudinaryImagePage[]> {
  try {
    const response = await cloudinary.api.resources({
      resource_type: 'image',
      max_results: IMAGE_PAGE_SIZE,
      next_cursor,
      prefix: options?.folder ? `${options.folder}/` : undefined,
      type: 'upload',
    });

    pages.push({
      images: response.resources.map(transformImage),
      pageNumber: pages.length + 1,
    });

    if (response.next_cursor) {
      return getPaginatedImages(options, pages, response.next_cursor);
    }

    return pages;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  }
}
