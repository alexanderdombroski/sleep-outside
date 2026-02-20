import jwt, { type SignOptions } from "jsonwebtoken";
import type { User } from "../../shared/types/schemas.mts";

export function generateToken(user: Pick<User, "email" | "_id">): string {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || "1h";
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set.");
  }
  return jwt.sign({ email: user.email, _id: user._id }, secret, {
    expiresIn,
  } as SignOptions);
}

export function sanitize(v: Record<string, any>) {
  if (typeof v === "object") {
    for (var key in v) {
      if (/^\$/.test(key)) {
        delete v[key];
      } else {
        sanitize(v[key]);
      }
    }
  }
  return v;
}
