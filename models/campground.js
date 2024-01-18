import mongoose from "mongoose";
import Review from "./review.js";
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
});
campgroundSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});
export default mongoose.model("campgrounds", campgroundSchema);
