import { initMongoConnection } from './db/initMongoConnection.js';
import { ContactsCollection } from './db/models/contacts.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  await initMongoConnection();
  const contacts = await ContactsCollection.find({}).exec();
  console.log(contacts); // Для перевірки, що дані отримуються правильно
  setupServer();
};

bootstrap();