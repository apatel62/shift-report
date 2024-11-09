import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import { User } from "./user";

interface ReportAttributes {
  id: number;
  shiftNumber: string;
  date: Date;
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
  public assignedUserId!: number;

  // associated User model
  public readonly assignedUser?: User;

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
