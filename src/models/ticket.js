import mongoose from "mongoose";
const { Schema, model } = mongoose;
const allowedStatuses = ["open", "in_progress", "resolved", "closed"];

const TicketSchema = new Schema(
  {
    code: { type: String, unique: true, index: true }, // ex: TCK-2025-AB12CD
    title: { type: String, required: true, maxlength: 200 },
    description: { type: String, required: true },
     user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: allowedStatuses,
      default: "open",
      index: true,
    },
  },
 
  { timestamps: true },
);

const Ticket = model("Ticket", TicketSchema);

export { Ticket, allowedStatuses };
