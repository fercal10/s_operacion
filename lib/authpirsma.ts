import { jwtVerify, SignJWT } from "jose";
import { JWT_SECRET_KEY } from "./constants";
import { NextApiResponse } from "next";
import prisma from "./prisma";
import { IncomingMessage } from "http";
import { compare, hash } from "bcrypt";

interface UserJwtPayload {
  jti: string;
  iat: number;
}

export class AuthError extends Error {}

export async function loginUser(
  user: string,
  password: string,
  res: NextApiResponse
) {
  const newuser = await prisma.user.findUnique({
    where: {
      usuario: user,
    },
  });
  if (!newuser) throw new AuthError("Error de credenciales ");
  const verdad = await compare(password, newuser.password);
  if (verdad) {
    return await setUserCookie(res, newuser.id);
  }
  throw new AuthError("Error de credenciales ");
}
export async function registrarUser(user: string, password: string) {
  const newpassword = await hash(password, 10);
  console.log("Contrasena ", newpassword);
  const newuser = await prisma.user.create({
    data: {
      usuario: user,
      password: newpassword,
    },
  });

  console.log(newuser);
}

export async function verifyAuthApi(
  req: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string;
    }>;
  }
) {
  const token = req.cookies.token;
  // console.log(token);

  if (!token) throw new AuthError("Perdida de token");
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET_KEY)
    );
    return verified.payload as UserJwtPayload;
  } catch (err) {
    throw new AuthError("Tu token a expirado.");
  }
}

/**
 * Adds the user token cookie to a response.
 */
export async function setUserCookie(res: NextApiResponse, id: string) {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setJti(id)
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(new TextEncoder().encode(JWT_SECRET_KEY));

  res.setHeader(
    "Set-Cookie",
    `token=${token}; path=/;  httpOnly: true, maxAge: 60 * 60 * 2`
  );

  return res;
}
