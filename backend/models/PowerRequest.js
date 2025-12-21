const mongoose = require('mongoose');

const PowerRequestSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmerName: { type: String, required: true },
  area: { type: String, required: true },
  powerRequired: { type: Number, required: true },
  purpose: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  requestDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('PowerRequest', PowerRequestSchema);
