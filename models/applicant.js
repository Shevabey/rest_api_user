import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Applicant = db.define(
  "applicants",
  {
    uuid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    experience: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "jobPostings", // Assumes your JobPosting model is named 'jobPostings'
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export default Applicant;
