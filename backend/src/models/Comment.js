import mongoose from "mongoose"

const commentSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    message: { type: String, required: true },
    course: { type: String, required: true },
  },
  { timestamps: true },
)

const Comment = mongoose.model("Comment", commentSchema)

export default Comment
