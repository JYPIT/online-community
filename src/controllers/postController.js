const fakeUser = {
  username: "Holmes",
  loggedIn: true,
};

let posts = [
  {
    title: "지구서 100광년 거리에 있는 ‘바다행성’ 발견",
    createdAt: "1시간 전",
    views: 777,
    comments: 231,
    id: 1,
  },
  {
    title: "메타버스 윤리 원칙, 시장 발전 막을까?…자율 규제 기반 윤리 원칙 적용에...",
    createdAt: "13분 전",
    views: 134,
    comments: 32,
    id: 2,
  },
  {
    title: "700광년 밖 가스행성서 CO₂첫 포착",
    createdAt: "27분 전",
    views: 343,
    comments: 111,
    id: 3,
  },
];

export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Ἀγορά", fakeUser: fakeUser, posts: posts });
};

export const watch = (req, res) => {
  const { id } = req.params;
  console.log("Show post", id);
  const post = posts[id - 1];
  return res.render("watch", { pageTitle: `${post.title}`, fakeUser, post });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  console.log("Show post", id);
  const post = posts[id - 1];
  return res.render("edit", { pageTitle: `수정: ${post.title}`, fakeUser, post });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  posts[id - 1].title = title;
  res.redirect(`/posts/${id}`);
};
export const search = (req, res) => res.send("Search");
export const deletePost = (req, res) => res.send("Delete Post");
export const getUpload = (req, res) => res.render("upload", { pageTitle: "글쓰기", fakeUser });
export const postUpload = (req, res) => {
  const { title } = req.body;
  const newPost = {
    title: title,
    createdAt: "방금 전",
    views: 0,
    comments: 0,
    id: posts.length + 1,
  };
  posts.push(newPost);
  return res.redirect("/");
};
