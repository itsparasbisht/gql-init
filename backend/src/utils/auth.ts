import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import { config } from "../config.js";
import type { IUser } from "../database/models.js";
import { logger } from "./logger.js";

/**
 * Hash a plain text password using bcrypt.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Compare a plain text password with a hashed password.
 */
export const comparePasswords = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

/**
 * Generate a JWT for a user.
 */
export const generateToken = (user: IUser): string => {
  return jwt.sign({ userId: user._id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN as any,
  });
};

/**
 * Verify a JWT and return its payload.
 */
export const verifyToken = (token: string): { userId: string } | null => {
  try {
    return jwt.verify(token, config.JWT_SECRET) as { userId: string };
  } catch (error) {
    logger.error(error, "Invalid JWT token");
    return null;
  }
};

/**
 * Higher-order resolver to ensure a user is authenticated.
 * It takes the 'originalResolver' as an argument and returns a guarded version of it.
 */
export function requireAuth<TParent, TArgs, TContext, TReturn>(
  originalResolver: (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: any,
  ) => TReturn | Promise<TReturn>,
) {
  return function (parent: TParent, args: TArgs, context: TContext, info: any) {
    if (!(context as any).user) {
      throw new GraphQLError("Authentication required", {
        extensions: { code: "UNAUTHENTICATED", http: { status: 401 } },
      });
    }

    return originalResolver(parent, args, context, info);
  };
}
