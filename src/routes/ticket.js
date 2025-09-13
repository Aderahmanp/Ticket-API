// help me to create routes for ticket
import express from "express";
import { createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket, getTicketsByStatus } from "../controllers/ticket.js";

const router = express.Router();

router.post("/", createTicket);
router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.get("/status/:status", getTicketsByStatus);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);

export default router;