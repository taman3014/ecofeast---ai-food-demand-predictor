import mongoose from 'mongoose';

const RecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  itemId: { type: String, required: true },
  itemName: { type: String, required: true },
  prepared: { type: Number, required: true },
  sold: { type: Number, required: true },
  waste: { type: Number, required: true },
  revenue: { type: Number, required: true },
  loss: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const RecordModel = mongoose.models.Record || mongoose.model('Record', RecordSchema);
export default RecordModel;
