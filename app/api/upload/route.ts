import { cloudinary } from '@/utils/cloudinary';
import { IMAGES_TOKEN, UPLOAD_KEY } from '@/utils/constants';
import { NextRequest, NextResponse } from 'next/server';
import streamifier from 'streamifier';

// const uploadFile = util.promisify(cloudinary.uploader.upload_stream);

type UploadOptions = {
  filename: string;
  folder?: string;
};

async function uploadFile(buffer: Buffer, options: UploadOptions) {
  return new Promise((resolve, reject) => {
    let uploadStream = cloudinary.uploader.upload_stream(
      { folder: options.folder, filename_override: options.filename, use_filename: true },
      (error, result) => {
        if (error) reject(error);
        resolve(result);
      },
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Validate the keys
    const key = formData.get('__key__') as string | null;
    const token = formData.get('__token__') as string | null;
    const secret = formData.get('__secret__') as string | null;

    if (key !== UPLOAD_KEY || token !== IMAGES_TOKEN || secret !== '') {
      return NextResponse.json({ error: 'Invalid key or token.' }, { status: 401 });
    }

    const file = formData.get('file') as Blob | null;
    if (!file) {
      return NextResponse.json({ error: 'File blob is required.' }, { status: 400 });
    }

    const filename = formData.get('filename') as string;
    if (!filename) {
      return NextResponse.json({ error: 'Could not set filename.' }, { status: 400 });
    }

    const folder = formData.get('folder') as string | null;

    // console.log(file);
    const buffer = Buffer.from(await file.arrayBuffer());
    const image = await uploadFile(buffer, { filename, folder: folder || undefined });

    return NextResponse.json({ image });

    // redirect('/');
  } catch (error: any) {
    console.log('ERROR:', error);
    return NextResponse.json({ error: error?.message || error }, { status: 500 });
  }
}
