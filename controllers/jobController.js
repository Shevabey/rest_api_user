import Job from "../models/job.js";
import User from "../models/user.js";
import { Op } from "sequelize";

// CONTROLLER PEMOSTING LOWONGAN PEKERJAAN HANYA DAPAT DI AKSES ROLE ADMIN DAN COMPANY
// VARIABLE GET DATA LOWONGAN YANG TELAH DIPOSTING
export const getJobs = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Job.findAll({
        attributes: [
          // MENAMPILKAN DATA GET BERDASARKAN ATRIBUT YANG DITAMPILKAN DITAK LAGI BERDASARKAN MODEL
          "uuid",
          "title",
          "description",
          "requirements",
          "contactInfo",
        ],
        include: [
          // MENAMPILKAN DATA YANG MEMBUAT POSTINGAN LOWONGAN
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Job.findAll({
        attributes: [
          // MENAMPILKAN DATA GET BERDASARKAN ATRIBUT YANG DITAMPILKAN TIDAK LAGI BERDASARKAN MODEL
          "uuid",
          "title",
          "description",
          "requirements",
          "contactInfo",
        ],
        where: {
          userId: req.userId,
        },
        include: [
          // MENAMPILKAN DATA YANG MEMBUAT POSTINGAN LOWONGAN
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// VARIABLE CREATE DATA LOWONGAN AKAN DIPOSTING
export const createJobs = async (req, res) => {
  const { title, description, requirements, contactInfo } = req.body;
  try {
    await Job.create({
      title: title,
      description: description,
      requirements: requirements,
      contactInfo: contactInfo,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Vacancy Created Succesfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// VARIABLE GET DATA BY UUID LOWONGAN YANG TELAH DIPOSTING
export const getJobsById = async (req, res) => {
  try {
    const job = await Job.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!job) return res.status(404).json({ msg: "Data tidak ditemukan" });

    let response;
    if (req.role === "admin") {
      response = await Job.findOne({
        where: {
          // MEMFILTER BERDASARKAN UUID YANG DIMASUKKAN
          id: job.id,
        },
        attributes: [
          // MENAMPILKAN DATA GET BERDASARKAN ATRIBUT YANG DITAMPILKAN TIDAK LAGI BERDASARKAN MODEL
          "uuid",
          "title",
          "description",
          "requirements",
          "contactInfo",
        ],
        include: [
          // MENAMPILKAN DATA YANG MEMBUAT POSTINGAN LOWONGAN
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Job.findOne({
        attributes: [
          // MENAMPILKAN DATA GET BERDASARKAN ATRIBUT YANG DITAMPILKAN TIDAK LAGI BERDASARKAN MODEL
          "uuid",
          "title",
          "description",
          "requirements",
          "contactInfo",
        ],
        where: {
          [Op.and]: [{ id: job.id }, { userId: req.userId }],
        },
        include: [
          // MENAMPILKAN DATA YANG MEMBUAT POSTINGAN LOWONGAN
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// UPDATE DATA JOBS BERDASARKAN UUI YANG DIPILIH UNTUK DI EDIT
export const updateJobs = async (req, res) => {
  try {
    const job = await Job.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!job) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { title, description, requirements, contactInfo } = req.body;
    if (req.role === "admin") {
      await Job.update(
        { title, description, requirements, contactInfo },
        {
          where: {
            id: job.id,
          },
        }
      );
    } else { 
      if (req.userId !== job.userId)
        return res.status(403).json({ msg: "Akses terlarang!" });
      await Job.update(
        { title, description, requirements, contactInfo },
        {
          where: {
            [Op.and]: [{ id: job.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Jobs updated successfuly!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// DELETE JOBS POSTING BERDASARKAN UUI YANG DIPILIH
export const deleteJobs = async (req, res) => {
  try {
    const job = await Job.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!job) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { title, description, requirements, contactInfo } = req.body;
    if (req.role === "admin") {
      await Job.destroy({
        where: {
          id: job.id,
        },
      });
    } else {
      if (req.userId !== job.userId)
        return res.status(403).json({ msg: "Akses terlarang!" });
      await Job.destroy({
        where: {
          [Op.and]: [{ id: job.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Jobs deleted successfuly!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
