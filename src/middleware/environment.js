// src/middleware/environment.js

/**
 * Middleware to restrict access to an endpoint unless the server is running in a non-production environment.
 * This is useful for protecting dangerous or test-only endpoints.
 */
export const allowOnlyInDevelopment = (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    // In production, deny access. Sending a 404 hides the endpoint's existence.
    return res.status(404).json({ message: 'Not Found' });
  }
  // In development or test environments, allow access.
  next();
};