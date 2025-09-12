import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;
const TicketSchema = new Schema(
  {
    code: { type: String, unique: true, index: true }, // ex: TCK-2025-AB12CD
    title: { type: String, required: true, maxlength: 200 },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "closed"],
      default: "open",
      index: true,
    },
  },
  { timestamps: true },
);

export const Ticket = model("Ticket", TicketSchema);



