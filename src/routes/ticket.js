import express from "express";
import { createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket, getTicketsByStatus, getUserTickets } from "../controllers/ticket.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Ticket routes
router.post("/", isAuthenticated, createTicket);
router.get("/my-tickets", isAuthenticated, getUserTickets); 
router.get("/", isAuthenticated, isAdmin, getAllTickets);
router.get("/:id", isAuthenticated, isAdmin, getTicketById);
router.get("/status/:status", isAuthenticated, getTicketsByStatus);
router.put("/:id", isAuthenticated, isAdmin, updateTicket);
router.delete("/:id", isAuthenticated, isAdmin, deleteTicket);


export default router;