import express from "express";
import {
  createJobs,
  deleteJobs,
  getJobs,
  getJobsById,
  updateJobs,
} from "../controllers/jobController.js";
import { verifyUser, companyOnly } from "../middleware/authUser.js";

const router = express.Router();

router.get("/jobs", verifyUser, companyOnly, getJobs);
router.get("/jobs/:id", verifyUser, companyOnly, getJobsById);
router.post("/jobs", verifyUser, companyOnly, createJobs);
router.delete("/jobs/:id", verifyUser, companyOnly, deleteJobs);
router.patch("/jobs/:id", verifyUser, companyOnly, updateJobs);

export default router;
