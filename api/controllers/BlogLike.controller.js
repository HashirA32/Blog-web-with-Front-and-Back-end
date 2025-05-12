import { handleError } from "../helpers/handleError.js";
import BlogLike from "../models/blogLike.model.js";
export const doLike = async (req, res, next) => {
  try {
    const { userid, blogid } = req.body;

    let like = await BlogLike.findOne({ userid, blogid });

    if (!like) {
      const saveLike = new BlogLike({ userid, blogid });
      like = await saveLike.save();
    } else {
      await BlogLike.findByIdAndDelete(like._id);
    }

    const likeCount = await BlogLike.countDocuments({ blogid });

    res.status(200).json({ likeCount });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const likeCount = async (req, res, next) => {
  try {
    const { blogid, userid } = req.query;

    if (!blogid) {
      return next(handleError(400, "Missing blog ID"));
    }

    const likeCount = await BlogLike.countDocuments({ blogid });
    let isUserliked = false;

    if (userid) {
      const getuserlike = await BlogLike.countDocuments({ blogid, userid });
      isUserliked = getuserlike > 0;
    }

    res.status(200).json({ likeCount, isUserliked });
  } catch (error) {
    console.error("Error in likeCount:", error);
    next(handleError(500, error.message));
  }
};
