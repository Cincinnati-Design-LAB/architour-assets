export const ALLOWED_USER_EMAILS = ['scdavis41@gmail.com'];
export const IMAGE_PAGE_SIZE = 20;

export const IMAGES_TOKEN = process.env.IMAGES_ACCESS_TOKEN!;
if (!IMAGES_TOKEN || !IMAGES_TOKEN.length) {
  throw new Error('Missing IMAGES_ACCESS_TOKEN environment variable');
}

export const UPLOAD_KEY = process.env.UPLOADER_SECRET_KEY!;
if (!UPLOAD_KEY || !UPLOAD_KEY.length) {
  throw new Error('Missing UPLOADER_SECRET_KEY environment variable');
}
