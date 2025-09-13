import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./src/models/user.js";
import { Ticket } from "./src/models/ticket.js";

dotenv.config();

const mongoUrl = process.env.MONGODB_URL;
const allowedStatuses = ["open", "in_progress", "resolved", "closed"];

const usersData = [
  { name: "Admin One", email: "admin12@mail.com", password: "adminpass1", role: "admin" },
  { name: "Admin Two", email: "admin22@mail.com", password: "adminpass2", role: "admin" },
  ...Array.from({ length: 8 }, (_, i) => ({
    name: `User${i + 1}`,
    email: `user${i + 1}@mail.com`,
    password: `userpass${i + 1}`,
    role: "customer"
  }))
];

function generateTicketCode(userIdx, ticketIdx) {
  return `TCK-${userIdx + 1}-${ticketIdx + 1}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}

async function seed() {
  await mongoose.connect(mongoUrl);

//   await User.deleteMany({});
//   await Ticket.deleteMany({});

  const users = [];
  for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({ ...userData, password: hashedPassword });
    await user.save();
    users.push(user);
  }

  for (let u = 0; u < users.length; u++) {
    for (let t = 0; t < 10; t++) {
      const status = allowedStatuses[Math.floor(Math.random() * allowedStatuses.length)];
      const ticket = new Ticket({
        code: generateTicketCode(u, t),
        title: `Ticket ${t + 1} for ${users[u].name}`,
        description: `Dummy description for ticket ${t + 1}`,
        user: users[u]._id,
        status
      });
      await ticket.save();
    }
  }

  console.log("Seed data created!");
  mongoose.disconnect();
}

seed();