import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  body: String,
  rating: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

export default mongoose.model("reviews", reviewSchema);
