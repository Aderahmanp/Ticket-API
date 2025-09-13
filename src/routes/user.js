import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser, getAllUsers
} from "../controllers/user.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile", isAuthenticated, getUserProfile);
router.put("/profile", isAuthenticated, updateUserProfile);
router.get("/", isAuthenticated, isAdmin, getAllUsers); // Admin only
router.delete("/:id", isAuthenticated, isAdmin, deleteUser); // Admin only

export default router;