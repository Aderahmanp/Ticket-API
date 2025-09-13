import express from "express";
import { createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket, getTicketsByStatus } from "../controllers/ticket.js";

const router = express.Router();

// Ticket routes
router.post("/", createTicket);
router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.get("/status/:status", getTicketsByStatus);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);

export default router;