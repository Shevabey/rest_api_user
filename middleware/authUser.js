import User from "../models/user.js";

// protect login user
export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun anda!" });
  }
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  req.userId = user.id;
  req.role = user.role;
  next();
};

// Acces admin only
export const adminOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  if (user.role !== "admin")
    return res.status(403).json({ msg: "Akses terlarang, admin only! " });
  next();
};

// Acces company only
export const companyOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  if (user.role !== "company" && user.role !== "admin")
    return res.status(403).json({ msg: "Akses terlarang, company only! " });
  next();
};

// Acces applicant only
export const applicantOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  if (user.role !== "applicant" && user.role !== "admin")
    return res.status(403).json({ msg: "Akses terlarang, admin only! " });
  next();
};
