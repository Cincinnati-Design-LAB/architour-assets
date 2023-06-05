import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log({ request });

  // redirect('/');
  return NextResponse.redirect(`${process.env.ROOT_URL}/stackbit-modal`, 302);
}
