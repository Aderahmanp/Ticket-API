import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    if (!JWT_SECRET_KEY) {
      console.error('JWT secret key is not defined. Please check your environment variables.');
      return res.status(500).json({ message: 'Server configuration error.' });
    }
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token", error: err.message });
  }
};

export const isAdmin = (req, res, next) => {
    console.log('User role in isAdmin middleware:', req.user.role); // Debug log
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ error: "Access denied. Admins only." });
};