// SCHEMA DESIGN 

const mongoose = require('mongoose');

const timeTrackingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  pageURL: { type: String, required: true },
  timeSpentOnPage: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const TimeTracking = mongoose.model('TimeTracking', timeTrackingSchema);

module.exports = TimeTracking;