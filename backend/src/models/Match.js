import mongoose from "mongoose"

const matchSchema = new mongoose.Schema(
  {
    lostItem: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    foundItem: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    confidence: { type: Number, required: true },
  },
  { timestamps: true }
)

const Match = mongoose.model("Match", matchSchema)

export default Match