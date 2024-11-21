const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const consultantSchema = new mongoose.Schema(
  {
    consultant:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    
    qualification: {
      type: String,
    },
    experience: {
      type: Number,
    },
    category: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
    primarySkills: {
      type: [String],
      enum: [
        "Astrology",
        "Vedic Astrology",
        "Numerology",
        "Tarot Reading",
        "Horoscope Analysis",
      ],
      default: ["Astrology"],
    },
  },
  { timestamps: true }
);

const Consultant = mongoose.model("Consultant", consultantSchema);
module.exports = Consultant;
