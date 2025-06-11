import Movie from "../models/movie-model.js";
import User from "../models/user-model.js";

const validateAgeForMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.body.movie_rented).exec();
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const user = await User.findById(req.body.rented_by).exec();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const current_year = new Date().getFullYear();
    const user_age = current_year - new Date(user.birthday_date).getFullYear();
    const min_age = movie.min_age;

    if (user_age < min_age) {
      return res
        .status(403)
        .json({
          error: `You must be at least ${min_age} years old to rent this movie`,
        });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default validateAgeForMovie;
