import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';
import { allowOnlyInDevelopment } from '../middleware/environment.js';
import { resetDatabase, seedDatabase } from '../controllers/test.js';

const router = express.Router();

/**
 * @route   POST /api/test/reset-database
 * @desc    Deletes all users and tickets from the database.
 * @access  Private, Admin, Development-Only
 */
router.post(
  '/reset-database',
  isAuthenticated,
  isAdmin,
  allowOnlyInDevelopment,
  resetDatabase
);

/**
 * @route   POST /api/test/seed-database
 * @desc    Clears and seeds the database with initial test data.
 * @access  Private, Admin, Development-Only
 */
router.post(
  '/seed-database',
  allowOnlyInDevelopment,
  seedDatabase
);

export default router;