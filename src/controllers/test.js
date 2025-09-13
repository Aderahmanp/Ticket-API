import { User } from '../models/user.js';
import { Ticket, allowedStatuses } from '../models/ticket.js';
import bcrypt from 'bcryptjs';

/**
 * @desc    Deletes all users and tickets from the database.
 * @route   POST /api/test/reset-database
 * @access  Private, Admin, Development-Only
 */
export const resetDatabase = async (req, res) => {
  try {
    await Ticket.deleteMany({});
    await User.deleteMany({});
    res.status(200).json({
      message: 'Database has been reset. All users and tickets are deleted.',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to reset the database.',
      error: error.message,
    });
  }
};

/**
 * @desc    Clears and seeds the database with initial test data.
 * @route   POST /api/test/seed-database
 * @access  Private, Admin, Development-Only
 */
export const seedDatabase = async (req, res) => {
  try {
    // 1. Clear existing data
    await Ticket.deleteMany({});
    await User.deleteMany({});

    // 2. Define seed data
    const usersData = [
      { name: 'Admin One', email: 'admin12@mail.com', password: 'adminpass1', role: 'admin' },
      { name: 'Admin Two', email: 'admin22@mail.com', password: 'adminpass2', role: 'admin' },
      ...Array.from({ length: 8 }, (_, i) => ({
        name: `User${i + 1}`,
        email: `user${i + 1}@mail.com`,
        password: `userpass${i + 1}`,
        role: 'customer',
      })),
    ];

    function generateTicketCode(userIdx, ticketIdx) {
      return `TCK-${userIdx + 1}-${ticketIdx + 1}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    }

    // 3. Create users
    const createdUsers = [];
    for (const userData of usersData) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({ ...userData, password: hashedPassword });
      await user.save();
      createdUsers.push(user);
    }

    // 4. Create tickets for each user
    for (let u = 0; u < createdUsers.length; u++) {
      for (let t = 0; t < 10; t++) {
        const status = allowedStatuses[Math.floor(Math.random() * allowedStatuses.length)];
        const ticket = new Ticket({
          code: generateTicketCode(u, t),
          title: `Ticket ${t + 1} for ${createdUsers[u].name}`,
          description: `Dummy description for ticket ${t + 1}`,
          user: createdUsers[u]._id,
          status,
        });
        await ticket.save();
      }
    }

    res.status(200).json({ message: 'Database has been successfully reset and seeded.' });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to seed the database.',
      error: error.message,
    });
  }
};
