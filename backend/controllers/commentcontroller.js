import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      item: req.params.id,
      user: req.user._id,
      text: req.body.text
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment", error: err.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ item: req.params.id }).populate("user", "name");
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch comments", error: err.message });
  }
};
