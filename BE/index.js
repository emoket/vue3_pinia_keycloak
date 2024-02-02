import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const { PORT } = process.env;

// Routes
import menus from './routes/menus.js';
import auth from './routes/auth.js';

// Middleware routes
import authenticate from './middlewares/authenticate.js';
import checkAdmin from './middlewares/checkAdmin.js';

const app = express();

app.use(cors());

// Register routes
app.use('/api/v1/auth', authenticate, auth);
app.use('/api/v1/menu', authenticate, checkAdmin, menus);

app.listen(PORT, () => console.log(`Backend started on port ${PORT}`));
