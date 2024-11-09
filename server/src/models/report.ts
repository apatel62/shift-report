import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import { User } from "./user";

interface ReportAttributes {
  id: number;
  shiftNumber: string;
  date: Date;
  machine: string;
  machineStatus: boolean; // machine up or down
  partsMade: number;
  comments?: string;
  assignedUserId?: number;
}

interface ReportCreationAttributes extends Optional<ReportAttributes, "id"> {}

export class Report
  extends Model<ReportAttributes, ReportCreationAttributes>
  implements ReportAttributes
{
  public id!: number;
  public shiftNumber!: string;
  public date!: Date;
  public machine!: string;
  public machineStatus!: boolean;
  public partsMade!: number;
  public comments?: string;
  public assignedUserId!: number;

  // associated User model
  public readonly associatedUser?: User;

  public readonly createdAt!: Date;
}

export function ReportFactory(sequelize: Sequelize): typeof Report {
  Report.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      shiftNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      machine: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      machineStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      partsMade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comments: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      assignedUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "reports",
      sequelize,
    }
  );

  return Report;
}
