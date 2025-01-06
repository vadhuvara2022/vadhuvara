import mongoose, { Schema, Document } from 'mongoose';

interface IContactRequest extends Document {
    name:string;
  mobileNumber: string;
  address: string;
  itemId: string;
}

const ContactRequestSchema: Schema = new Schema({
    name:{type: String, required: true},
  mobileNumber: { type: String, required: true },
  address: { type: String, required: true },
  itemId: { type: String, required: true },
});

export default mongoose.models.ContactRequest || mongoose.model<IContactRequest>('ContactRequest', ContactRequestSchema);