import mongoose from "mongoose";
import Review from "./review.js";
const Schema = mongoose.Schema;

const imageScehma = new Schema({
  url: String,
  filename: String,
});

imageScehma.virtual("thumbnail").get(() => {
  return this.url.replace("/upload", "/upload/w_200");
});
const opts = { toJSON: { virtuals: true } };
const campgroundSchema = new Schema(
  {
    title: String,
    images: [imageScehma],
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
  },
  opts
);
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
