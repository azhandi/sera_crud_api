const { Employee } = require('../models')
const { validateName, validateEmail } = require('../helper/validation')
const cst = require('../config/const.json')
const { Op } = require('sequelize')

exports.createEmployee = async (req, res) => {
  try {
    const emp_name = req.body.emp_name || ''
    const emp_email = req.body.emp_email || ''

    // validate
    if (!validateName(emp_name.trim())) {
      throw { errorCode: '#emp001', errorMessage: 'Invalid input: Name is invalid. Please try again.' }
    }

    if (!validateEmail(emp_email.trim())) {
      throw { errorCode: '#emp002', errorMessage: 'Invalid input: E-mail is invalid. Please try again.' }
    }

    const newEmployee = {
      emp_name,
      emp_email,
      emp_status: cst.emp_inactive,
      emp_joined_date: new Date()
    }
    

    // validate name
    const employee = await Employee.create(newEmployee)
    res.status(201).json({
      message: `New Employee Created`,
      payload: employee
    })
  } catch (error) {
    res.status(400).json({
      errorCode: error.errorCode || '#999',
      errorMessage: error.errorMessage || 'An unexpected error occurred',
    })
  }
}

exports.getAllEmployee = async (req, res) => {
  try {
    const { keyword } = req.query
    const whereClause = {}
    if (keyword) {
      whereClause[Op.or] = [
        { emp_id: { [Op.like]: `%${keyword}%` } },
        { emp_name: { [Op.like]: `%${keyword}%` } },
        { emp_email: { [Op.like]: `%${keyword}%` } },
        { emp_status: { [Op.like]: `%${keyword}%` } },
      ]
    }

    const allEmployees = await Employee.findAll({
      where: whereClause
    })

    return res.status(200).json({
      payload: {
        employees: allEmployees
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateEmployee = async (req, res) => {
  try {
    // const { emp_id, emp_name, emp_email, emp_status} = req.body
    const emp_id = req.body.emp_id || 0
    const emp_name = req.body.emp_name || ''
    const emp_email = req.body.emp_email || ''
    const emp_status = req.body.emp_status || ''
    
    // validate
    if (emp_id <= 0) {
      throw { errorCode: '#emp003', errorMessage: 'Employee not found.' }
    }
    
    if (emp_name.trim() != '' && !validateName(emp_name.trim())) {
      throw { errorCode: '#emp001', errorMessage: 'Invalid input: Name is invalid. Please try again.' }
    }
    
    if (emp_email.trim() != '' && !validateEmail(emp_email.trim())) {
      throw { errorCode: '#emp002', errorMessage: 'Invalid input: E-mail is invalid. Please try again.' }
    }
    
    let empStatus = emp_status.trim().toLowerCase()
    const allowedStatus = cst.emp_status
    if (emp_status != '' && !allowedStatus.includes(empStatus)) {
      throw { errorCode: '#emp004', errorMessage: 'Invalid employee status.' }
    }
    
    const existingEmployee = await Employee.findOne({
      where: { emp_id }
    })
    
    if (!existingEmployee) {
      throw { errorCode: '#emp003', errorMessage: 'Employee not found.' }
    }

    // update
    await Employee.update(
      {
        emp_name: emp_name != '' ? emp_name : existingEmployee.emp_name,
        emp_email: emp_email != '' ? emp_email : existingEmployee.emp_email,
        emp_status: emp_status != '' ? emp_status : existingEmployee.emp_status
      },
      {where: { emp_id }}
    )

    return res.status(200).json({
      message: 'Success update employee data',
    })
  } catch (error) {
    res.status(400).json({
      errorCode: error.errorCode || cst.default_err_code,
      errorMessage: error.errorMessage || cst.default_err_message,
    })
  }
}


exports.deleteEmployee = async (req, res) => {
  try {
    // const { emp_id, emp_name, emp_email, emp_status} = req.body
    const emp_id = req.params.id || 0
    
    // validate
    if (emp_id <= 0) {
      throw { errorCode: '#emp003', errorMessage: 'Employee not found.' }
    }
    
    const existingEmployee = await Employee.findOne({
      where: { emp_id }
    })
    
    if (!existingEmployee) {
      throw { errorCode: '#emp003', errorMessage: 'Employee not found.' }
    }

    // delete
    await existingEmployee.destroy()

    return res.status(200).json({
      message: 'Success delete employee data',
    })
  } catch (error) {
    res.status(400).json({
      errorCode: error.errorCode || cst.default_err_code,
      errorMessage: error.errorMessage || cst.default_err_message,
    })
  }
}
