import Post from "../models/Post.js";
import User from "../models/User.js";

export const home = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: "desc" });
    const { keyword } = req.query;
    let findedPost = [];
    if (keyword) {
      findedPost = await Post.find({
        title: {
          $regex: new RegExp(keyword, "i"),
        },
      }).sort({ createdAt: "desc" });
      const findCheck = await Post.exists({ title: { $regex: new RegExp(keyword, "i") } });
      if (!findCheck) {
        return res.status(404).render("search", { pageTitle: `"${keyword}"를 찾을 수 없습니다.`, findedPost, findCheck });
      } else {
        return res.render("search", { pageTitle: "검색", findedPost });
      }
    }
    return res.render("home", { pageTitle: "Home", posts });
  } catch {
    return res.render("Error");
  }
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("owner");
  if (!post) {
    return res.status(404).render("404", { pageTitle: "게시물이 존재하지 않습니다." });
  }
  return res.render("watch", { pageTitle: post.title, post });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).render("404", { pageTitle: "게시물이 존재하지 않습니다." });
  }
  if (String(post.owner) !== _id) {
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `수정: ${post.title}`, post });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const { title, content, hashtags } = req.body;
  const post = await Post.findById(id);
  if (!post) {
    return res.render("404", { pageTitle: "게시물이 존재하지 않습니다." });
  }
  if (String(post.owner) !== _id) {
    return res.status(403).redirect("/");
  }
  await Post.findByIdAndUpdate(id, {
    title,
    content,
    hashtags: Post.formatHashtags(hashtags),
  });
  res.redirect(`/posts/${id}`);
};

export const getUpload = (req, res) => res.render("upload", { pageTitle: "글쓰기" });
export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { path: fileUrl } = req.file;
  const { title, content, hashtags } = req.body;
  try {
    const newPost = await Post.create({
      fileUrl,
      title: title,
      content: content,
      owner: _id,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    const user = await User.findById(_id);
    user.posts.push(newPost._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", { pageTitle: "Upload Video", errorMessage: error._message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const post = await Post.findById(id);
  if (!post) {
    return res.render("404", { pageTitle: "게시물이 존재하지 않습니다." });
  }
  if (String(post.owner) !== _id) {
    return res.status(403).redirect("/");
  }
  await Post.findByIdAndDelete(id);
  return res.redirect("/");
};
