import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import { Report } from "./report";

interface MachineAttributes {
  id: number;
  machine: string;
  machineStatus: string; // machine up or down
  partsMade: number;
  comments?: string;
  assignedReportId?: number;
}

interface MachineCreationAttributes extends Optional<MachineAttributes, "id"> {}

export class Machine
  extends Model<MachineAttributes, MachineCreationAttributes>
  implements MachineAttributes
{
  public id!: number;
  public machine!: string;
  public machineStatus!: string;
  public partsMade!: number;
  public comments?: string;
  public assignedReportId!: number;

  // associated Report model
  public readonly assignedReport?: Report;
}

export function MachineFactory(sequelize: Sequelize): typeof Machine {
  Machine.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      machine: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      machineStatus: {
        type: DataTypes.STRING,
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
      assignedReportId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "machines",
      sequelize,
    }
  );

  return Machine;
}
