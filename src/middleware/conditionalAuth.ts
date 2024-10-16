import { Request, Response, NextFunction } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import dotenv from 'dotenv';
import User from '../mongoose/models/User';

dotenv.config();

const jwtCheck = auth({
  secret: process.env.AUTH0_SECRET,
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'HS256',
});

const conditionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    console.log("Authorization header found, applying JWT check middleware");

    // Apply the JWT check middleware if the Authorization header is present
    jwtCheck(req, res, async (err) => {
      if (err) {
        console.error("Error verifying token:", err);
        return res.status(401).send("Unauthorized");
      }

      const decodedToken = req.auth; // The decoded token will be attached to req.auth

      const sub = decodedToken?.payload?.sub;
      if (!sub) {
        return res.status(401).send("Unauthorized");
      }

      // Fetch or create the user
      let user = await User.findOne({ sub });
      if (!user) {
        user = new User({
          sub,
          email: decodedToken.payload.email || " ",
          name: decodedToken.payload.name || " ",
          nickname: decodedToken.payload.nickname || " ",
          timestamp: new Date().toISOString(),
        });
        await user.save();
      }

      // Attach the user to the request object
      req.user = user;

      next();
    });
  } else {
    console.log("No Authorization header found, skipping JWT check middleware");
    // If no Authorization header, skip the JWT check middleware
    next();
  }
};

export default conditionalAuth;