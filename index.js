import express from 'express';
import mongoose from 'mongoose';
import ticketRoutes from './src/routes/ticket.js';
import usersRoutes from './src/routes/user.js';
import testRoutes from './src/routes/test.js';

const app = express();

// Middleware to parse JSON requests
app.use(express.json());


// Initial PORT 
const PORT = process.env.PORT || 1234;
const mongoUrl = process.env.MONGODB_URL;

// Mount ticket routes
app.use("/api/tickets", ticketRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/test", testRoutes); // Routes for testing purposes

const startServer = async () => {
    try {
        if (!mongoUrl) {
            throw new Error("MONGODB_URL is not defined in the environment variables.");
        }
        // The options like { useNewUrlParser: true } are deprecated and no longer needed in Mongoose v6+
        await mongoose.connect(mongoUrl);
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log('Server started on port ' + PORT);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1); // Exit with a failure code
    }
};

startServer();