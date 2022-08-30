import User from "../models/User.js";
import bcrypt from "bcrypt";

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
    return res.render("login", { pageTitle, errorMessage: error._message });
  }
};
export const edit = (req, res) => res.send("edit");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See");
export const getLogin = (req, res) => {
  const pageTitle = "로그인";
  res.render("login", { pageTitle });
};
export const postLogin = async (req, res) => {
  const { pageTitle } = "로그인";
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", { pageTitle, errorMessage: "아이디가 존재하지 않습니다." });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", { pageTitle, errorMessage: "비밀번호가 일치하지 않습니다." });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  res.redirect("/");
};
