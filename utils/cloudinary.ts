import Cloudinary from 'cloudinary';
import { IMAGE_PAGE_SIZE } from './constants';

/* ----- Cloudinary Client ----- */

const cloudinary = Cloudinary.v2;

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
  /** Presentable version of the file */
  filename: string;
  /** Date created - used for sorting */
  created_at: string;
  /** Name of folder where the image lives. Undefined if in root. */
  folder?: CloudinaryFolder;
};

type CloudinaryImagePage = {
  /** Page number to use in the UI */
  pageNumber: number;
  /** Array of images on the current page */
  images: CloudinaryImage[];
};

/* ----- Transformer ----- */

function transformImage(image: any): CloudinaryImage {
  const { width, height, public_id, secure_url, created_at, folder } = image;
  let filename = public_id.split('/').pop(); // Remove folder name
  const id = filename.split('_').pop();
  filename = filename.replace(`_${id}`, ''); // Remove id
  return {
    created_at,
    filename,
    folder: folder.length ? folder : undefined,
    height,
    public_id,
    url: secure_url,
    width,
  };
}

/* ----- Images ----- */

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

/* ----- Folders ----- */

export type CloudinaryFolder = {
  name: string;
  path: string;
};

export async function getFoldersList(model: string) {
  const response = await cloudinary.api.sub_folders(model, { max_results: 500 });
  return response.folders as CloudinaryFolder[];
}
