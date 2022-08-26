const fakeUser = {
  username: "Holmes",
  loggedIn: false,
};

export const trending = (req, res) => {
  const posts = [
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
  return res.render("home", { pageTitle: "Ἀγορά", fakeUser: fakeUser, posts: posts });
};
export const see = (req, res) => res.render("watch", { pageTitle: "Watch" });
export const editPost = (req, res) => res.render("editPost", { pageTitle: "Edit Post", fakeUser });
export const search = (req, res) => res.send("Search");
export const deletePost = (req, res) => res.send("Delete Post");
export const upload = (req, res) => res.send("Upload");
