import { Ticket, allowedStatuses } from "../models/ticket.js";   
import { nanoid } from "nanoid";

function generateTicketCode() {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TCK-${year}-${random}`;
}

// create ticket
export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id; // from auth middleware
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }
    const code = generateTicketCode();
    const ticket = new Ticket({ title, description, user: userId, code });
    await ticket.save();
    res.status(201).json(ticket); // <-- Always send a response
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Duplicate ticket code. Please try again." });
    }
    res.status(500).json({ error: error.message }); // <-- Always send a response
  }         
};
// get all tickets
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get single ticket
export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }   
    res.status(200).json(ticket);
    } catch (error) {
    console.error("Error fetching ticket:", error);
    res.status(500).json({ message: "Internal server error" });
  } 
};

// create get ticket by status
export const getTicketsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const tickets = await Ticket.find({ status });
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets by status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update ticket
export const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const ticket = await Ticket.findById(id);
    if
    (!ticket) { 
        return res.status(404).json({ message: "Ticket not found" });
    }
    if (title) ticket.title = title;
    if (description) ticket.description = description;
    if (status) {
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: `Invalid status. Allowed values: ${allowedStatuses.join(', ')}` });
      }
      ticket.status = status;
    }
    await ticket.save();
    res.status(200).json(ticket);
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// delete ticket
export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndDelete(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    } 
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    res.status(500).json({ message: "Internal server error" });
  } 
};


// get api for get tickets by user id
export const getUserTickets = async (req, res) => {
  try {
    const userId = req.user.id; // from isAuthenticated middleware      
    const tickets = await Ticket.find({ user: userId });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};