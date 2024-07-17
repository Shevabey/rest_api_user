import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./user.js";

const { DataTypes } = Sequelize;

const Jobs = db.define(
  "jobs",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    requirements: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    contactInfo: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Jobs, { foreignKey: "userId" });
Jobs.belongsTo(Users, { foreignKey: "userId" });

export default Jobs;
