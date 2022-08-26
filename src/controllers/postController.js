const fakeUser = {
  username: "Holmes",
  loggedIn: false,
};

export const trending = (req, res) => {
  const posts = [1, 2, 3, 4, 5];
  return res.render("home", { pageTitle: "Ἀγορά", fakeUser: fakeUser, posts: posts });
};
export const see = (req, res) => res.render("watch", { pageTitle: "Watch" });
export const edit = (req, res) => res.render("edit");
export const search = (req, res) => res.send("Search");
export const deletePost = (req, res) => res.send("Delete Post");
export const upload = (req, res) => res.send("Upload");
