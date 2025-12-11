import jwt from "jsonwebtoken";

// Access token — short lived (e.g., 15 minutes)
export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role || "user",
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m" }
  );
};

// Refresh token — long lived (e.g., 7 days)
export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d" }
  );
};
