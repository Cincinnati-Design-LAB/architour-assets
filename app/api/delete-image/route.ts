import { CloudinaryImage, cloudinary } from '@/utils/cloudinary';
import { IMAGES_TOKEN } from '@/utils/constants';
import { NextRequest, NextResponse } from 'next/server';

async function deleteFile(image: CloudinaryImage) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(image.public_id, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log({ data });

    // Validate the keys
    const token = data.__token__ as string | null;
    const secret = data.__secret__ as string | null;

    if (token !== IMAGES_TOKEN || secret !== '') {
      return NextResponse.json({ error: 'Invalid key or token.' }, { status: 401 });
    }

    const image = data.image as CloudinaryImage | null;
    if (!image) {
      return NextResponse.json({ error: 'Image is required.' }, { status: 400 });
    }

    await deleteFile(image);

    return NextResponse.json({ image });
  } catch (error: any) {
    console.log('ERROR:', error);
    return NextResponse.json({ error: error?.message || error }, { status: 500 });
  }
}
