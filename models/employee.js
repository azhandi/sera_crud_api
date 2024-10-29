const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Employee = sequelize.define('Employee', {
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
