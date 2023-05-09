import { cloudinary } from "./client";

export type CloudinaryImage = {
  /** Cloudinary ID value */
  publicId: string;
  /** Transformed URL for square thumbnail to use in Stackbit modal */
  thumbUrl: string;
};

export async function getImages(): Promise<CloudinaryImage[]> {
  const cloudinaryImages = await cloudinary.api.resources({
    resource_type: "image",
    max_results: 4,
  });

  const images = cloudinaryImages.resources.map((image) => {
    return {
      publicId: image.public_id,
      thumbUrl: cloudinary.url(image.public_id, {
        transformation: "stackbit-modal-thumb",
        secure: true,
      }),
    };
  }) as CloudinaryImage[];

  return images;
}
