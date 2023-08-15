import { type NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@lib/auth";

export const config = {
  matcher: ["/app/:path*"],
};

export async function middleware(req: NextRequest) {
  // validate the user is authenticated
  // const verifiedToken = await verifyAuth(req).catch((err) => {
  //   console.error(err.message);
  // });

  // ///Ver el id del usuario
  // //console.log(verifiedToken?.jti)

  // // redirect if the token is invalid
  // if (!verifiedToken) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }
}
