const mongoose = require("mongoose");

const slotSchema = mongoose.Schema({
  slot_time: {
    type: String,
    require: [true, "time is required"],
  },
  slot_date: {
    type: String,
    require: [true, "date is required"],
  },
  created_at: {
    type: Date,
    required: [true, "created_at is required"],
  },
});

const Slot = mongoose.model("Slot", slotSchema);

module.exports = Slot;
