import type { APIRoute } from "astro";

export const get: APIRoute = async function get({ request }) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  // const id = params.id;
  // const product = await getProduct(id);

  // if (!product) {
  //   return new Response(null, {
  //     status: 404,
  //     statusText: 'Not found'
  //   });
  // }

  const randomNumber = Math.random() * 100;

  const response = { randomNumber, q: params.get("q") };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
