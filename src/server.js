import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import { getAllContacts, getContactsById } from './services/contacts.js';
import { ObjectId } from 'mongodb';

dotenv.config();


const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(express.json());

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      console.error('Error fetching contacts:', error.message);
      res.status(500).json({
        status: 500,
        message: 'Internal server error',
      });
    }
  });

  app.get('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Received ID: ${id}`);
    if (!ObjectId.isValid(id)) {
      console.error(`Invalid ObjectId: ${id}`);
      return res.status(400).json({
        status: 400,
        message: 'Invalid contact ID format',
      });
    }

    try {
      const contact = await getContactsById(id);
      if (!contact) {
        return res.status(404).json({
          status: 404,
          message: 'Contact not found',
        });
      }
      res.json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data: contact,
      });
    } catch (error) {
      console.error(`Error fetching contact with id ${id}:`, error.message);
      res.status(500).json({
        status: 500,
        message: 'Internal server error',
      });
    }
  });
  const PORT = process.env.PORT || 3000;
  // Port Validation
  if (isNaN(PORT) || PORT <= 0 || PORT >= 65536) {
    console.error('Invalid PORT number. It must be between 1 and 65535.');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export { setupServer };