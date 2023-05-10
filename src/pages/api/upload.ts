import { cloudinary } from "@content/utils/client";
import type { APIRoute } from "astro";

// async function blobToBase64(blob): Promise<string | ArrayBuffer> {
//   return new Promise((resolve, _) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result);
//     reader.readAsDataURL(blob);
//   });
// }

export const post: APIRoute = async ({ request }) => {
  if (!import.meta.env.UPLOAD_SECRET_KEY) {
    console.error("No upload secret key");
    return new Response(null, {
      status: 500,
      statusText: "Internal server error",
    });
  }

  const referer = request.headers.get("referer");
  if (
    !referer ||
    !import.meta.env.ALLOWED_UPLOAD_ORIGIN ||
    referer !== import.meta.env.ALLOWED_UPLOAD_ORIGIN
  ) {
    console.error("Invalid referer", referer);
    return new Response(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  // const url = new URL(request.url);
  // const params = new URLSearchParams(url.search);

  // console.log({ request });
  // console.log(request.body);
  const body = await request.formData();
  const image = body.get("imageUrl");
  const key = body.get("__key__");

  if (key !== import.meta.env.UPLOAD_SECRET_KEY) {
    console.error("Invalid key", key);
    return new Response(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  if (!image) {
    console.error("No image");
    return new Response(null, {
      status: 400,
      statusText: "Bad request",
    });
  }

  if (typeof image !== "string") {
    console.error("Image is not a string");
    return new Response(null, {
      status: 400,
      statusText: "Bad request",
    });
  }

  // console.log({ image });

  // const buffer = Buffer

  // console.log(image.toString("base64"));
  // const buffer = Buffer.from( await image.arrayBuffer())

  // console.log(buffer, buffer.toString("base64"));

  // const base64Image = await blobToBase64(image);
  const cloudinaryResponse = await cloudinary.uploader.upload(image, {
    use_filename: true,
  });

  // console.log(cloudinaryResponse);

  const response = { success: true, public_id: cloudinaryResponse.public_id };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
