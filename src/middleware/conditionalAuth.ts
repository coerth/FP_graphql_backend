import { Request, Response, NextFunction } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import dotenv from 'dotenv';

dotenv.config();

const jwtCheck = auth({
  secret: process.env.AUTH0_SECRET,
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'HS256',
});

const conditionalAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {

    // Apply the JWT check middleware if the Authorization header is present
    jwtCheck(req, res, (err) => {
      if (err) {
        console.error("Error verifying token:", err);
        return res.status(401).send("Unauthorized");
      }

      const decodedToken = req.auth; // The decoded token will be attached to req.auth

      next();
    });
  } else {
    // If no Authorization header, skip the JWT check middleware
    next();
  }
};

export default conditionalAuth;