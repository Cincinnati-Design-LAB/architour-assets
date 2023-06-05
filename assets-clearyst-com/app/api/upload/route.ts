import { cloudinary } from '@/utils/cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import streamifier from 'streamifier';

// const uploadFile = util.promisify(cloudinary.uploader.upload_stream);

async function uploadFile(buffer: Buffer) {
  return new Promise((resolve, reject) => {
    let uploadStream = cloudinary.uploader.upload_stream({ folder: 'foo' }, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    // console.log(formData);

    const file = formData.get('file') as Blob | null;
    if (!file) {
      return NextResponse.json({ error: 'File blob is required.' }, { status: 400 });
    }

    // console.log(file);
    const buffer = Buffer.from(await file.arrayBuffer());
    const image = await uploadFile(buffer);

    return NextResponse.json({ image });

    // redirect('/');
  } catch (error: any) {
    console.log('ERROR:', error);
    return NextResponse.json({ error: error?.message || error }, { status: 500 });
  }
}
