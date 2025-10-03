import mongoose from "mongoose"

const itemSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["lost", "found"], required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    occurredAt: { type: Date, required: true },
    image: { type: String },
    reporterName: { type: String, required: true },
    reporterEmail: { type: String, required: true },
    matchConfidence: { type: Number },
  },
  { timestamps: true },
)

const Item = mongoose.model("Item", itemSchema)

export default Item
