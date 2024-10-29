import { DataTypes, Model, Optional, Sequelize } from 'sequelize'

interface EmployeeAttributes {
  emp_id: number
  emp_name: string
  emp_email: string
  emp_status: 'active' | 'inactive'
  emp_joined_date: Date
}

export type EmployeeCreationAttributes = Optional<EmployeeAttributes, 'emp_id'>

export interface EmployeeInstance extends Model<EmployeeAttributes, EmployeeCreationAttributes>, EmployeeAttributes {
 // do nothing
}

export const EmployeeFactory = (sequelize: Sequelize) => {
  const Employee = sequelize.define<EmployeeInstance>('Employee', {
    emp_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    emp_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emp_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    emp_status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
    },
    emp_joined_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'employees',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  })

  return Employee
}
