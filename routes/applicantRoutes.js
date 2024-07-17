import express from "express";
import { getJobs, getJobsById } from "../controllers/applicantController.js";
import { verifyUser, applicantOnly } from "../middleware/authUser.js";

const router = express.Router();

router.get("/vacancies", verifyUser, applicantOnly, getJobs);
router.get("/vacancies/:id", verifyUser, applicantOnly, getJobsById);

export default router;
