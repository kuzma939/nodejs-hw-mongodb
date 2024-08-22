import { model, Schema } from 'mongoose';
const contactsSchema = new Schema(

  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      required: true,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
    userId: {
       type: Schema.Types.ObjectId, 
       required: true 
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
 
);

const ContactsCollection  = model('Contact', contactsSchema);
export { ContactsCollection  };