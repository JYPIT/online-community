import User from "../models/User.js";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

export const getJoin = (req, res) => res.render("join", { pageTitle: "회원가입" });
export const postJoin = async (req, res) => {
  const { username, password, password2, nickname, email } = req.body;
  const pageTitle = "회원가입";
  if (password !== password2) {
    return res.status(400).render("join", { pageTitle, errorMessage: "패스워드가 일치하지 않습니다." });
  }
  const usernameExists = await User.exists({ username: username });
  if (usernameExists) {
    return res.status(400).render("join", { pageTitle, errorMessage: "이미 존재하는 아이디입니다." });
  }
  const nicknameExists = await User.exists({ nickname: nickname });
  if (nicknameExists) {
    return res.status(400).render("join", { pageTitle, errorMessage: "이미 존재하는 닉네임입니다." });
  }
  const emailExists = await User.exists({ email: email });
  if (emailExists) {
    return res.status(400).render("join", { pageTitle, errorMessage: "이미 존재하는 이메일입니다." });
  }
  try {
    await User.create({
      username,
      password,
      nickname,
      email,
    });
    return res.redirect("login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
export const getLogin = (req, res) => res.render("login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ username, socialOnly: false });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};
export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find((email) => email.primary === true && email.verified === true);
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        avatarUrl: userData.avatar_url,
        username: userData.login,
        password: "",
        nickname: userData.name,
        email: emailObj.email,
        socialOnly: true,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};
export const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

export const getEdit = (req, res) => {
  return res.render("edit-profile", { pageTitle: "프로필 수정" });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { nickname, email },
    file,
  } = req;
  // const id = req.session.user.id;
  // const { nickname, email } = req.body;
  console.log(file);
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      nickname: nickname,
      email: email,
    },
    {
      new: true,
    }
  );
  req.session.user = updatedUser;
  return res.redirect("/users/edit");
};

export const getChangePasswd = (req, res) => {
  return res.render("users/change-password", { pageTitle: "비밀번호 변경" });
};
export const postChangePasswd = (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPasswordCheck },
  } = req;
  return res.redirect("/");
};

export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("posts");
  if (!user) {
    return res.status(404).render("404", { pageTitle: "NOT FOUND" });
  }
  return res.render("users/profile", { pageTitle: `${user.nickname}의 프로필`, user });
};
