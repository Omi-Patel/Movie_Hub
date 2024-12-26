import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    // required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const movieModel =
  mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export default movieModel;
