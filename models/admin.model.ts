import mongoose from 'mongoose';

export interface I_AdminDocument extends mongoose.Document {
  email: string;
  password: string;
}

const AdminSchema: mongoose.Schema<I_AdminDocument> = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
});

const AdminModel = mongoose.model<I_AdminDocument>('Admin', AdminSchema, 'admins');

export default AdminModel;