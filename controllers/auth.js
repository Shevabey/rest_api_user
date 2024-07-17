import User from "../models/user.js";
import argon2 from "argon2";

// Controller untuk registrasi user
export const register = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;

  // Validasi password dan confirmPassword
  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  }

  // Hash password menggunakan argon2
  const hashPassword = await argon2.hash(password);
  try {
    // Buat user baru
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    res.status(201).json({ msg: "Registrasi berhasil", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// CONTROLLER LOGIN UNTUK MASUK KE AKUN YANG SUDAH DI REGISTER
export const Login = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Wrong Password" });
  req.session.userId = user.uuid;
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;
  res.status(200).json({ uuid, name, email, role });
};

// CONTROLLER AKUN SETELAH LOGIN MENGETAHUI DATA AKUN YANG TELAH LOGIN
export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun anda!" });
  }
  const user = await User.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(user);
};

// CONTROLLER LOGOUT AKUN SETELAH LOGIN
export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
};
