import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '../config';
import { Patient } from './Patients';

export class Notes extends Model<InferAttributes<Notes>, InferCreationAttributes<Notes>> {
  declare id: CreationOptional<string>;
  declare content: string;
  declare patientId: string;
  declare summary: string;
  declare filePath: string | null;
}

Notes.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    patientId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'patients',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'notes',
    timestamps: true,
  },
);

Patient.hasMany(Notes, {
  foreignKey: 'patientId',
});

Notes.belongsTo(Patient, {
  foreignKey: 'patientId',
});
