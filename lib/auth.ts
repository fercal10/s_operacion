import type { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { jwtVerify } from "jose";
import { USER_TOKEN, JWT_SECRET_KEY } from "./constants";
import { NextApiRequest } from "next";

export interface UserJwtPayload {
  jti: string;
  iat: number;
}

export class AuthError extends Error {}

/**
 * Verifies the user's JWT token and returns its payload if it's valid.
 */
export async function verifyAuth(req: NextRequest) {
  const token = req.cookies.get(USER_TOKEN);

  if (!token) throw new AuthError("Missing user token");
  console.log("Token ", token);
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET_KEY)
    );
    // console.log('Payload', verified.payload);
    return verified.payload as UserJwtPayload;
  } catch (err) {
    throw new AuthError("Your token has expired.");
  }
}

/**
 * Adds the user token cookie to a response.
 */

/**
 * Expires the user token cookie
 */
export function expireUserCookie(res: NextResponse) {
  res.cookies.set(USER_TOKEN, "", { httpOnly: true, maxAge: 0 });
  return res;
}
