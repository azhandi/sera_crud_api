import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { Employee, EmployeeCreationAttributes } from '../models'
import { validateName, validateEmail } from '../helper/validation'
import cst from '../config/const'

export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const emp_name = req.body.emp_name || ''
    const emp_email = req.body.emp_email || ''

    // Validate
    if (!validateName(emp_name.trim())) {
      throw { errorCode: '#emp001', errorMessage: 'Invalid input: Name is invalid. Please try again.' }
    }

    if (!validateEmail(emp_email.trim())) {
      throw { errorCode: '#emp002', errorMessage: 'Invalid input: E-mail is invalid. Please try again.' }
    }

    const newEmployee: EmployeeCreationAttributes = {
      emp_name,
      emp_email,
      emp_status: cst.emp_inactive,
      emp_joined_date: new Date(),
    }

    const employee = await Employee.create(newEmployee)
    res.status(201).json({
      message: 'New Employee Created',
      payload: employee,
    })
  } catch (error: any) {
    console.error(error)
    res.status(400).json({
      errorCode: error.errorCode || '#999',
      errorMessage: error.errorMessage || 'An unexpected error occurred',
    })
  }
}

export const getAllEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { keyword } = req.query
    const whereClause: any = {}

    if (keyword) {
      whereClause[Op.or] = [
        { emp_id: { [Op.like]: `%${keyword}%` } },
        { emp_name: { [Op.like]: `%${keyword}%` } },
        { emp_email: { [Op.like]: `%${keyword}%` } },
        { emp_status: { [Op.like]: `%${keyword}%` } },
      ]
    }

    const allEmployees = await Employee.findAll({ where: whereClause })
    res.status(200).json({
      payload: { employees: allEmployees },
    })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}

export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const emp_id = req.body.emp_id || 0
    const emp_name = req.body.emp_name || ''
    const emp_email = req.body.emp_email || ''
    const emp_status = req.body.emp_status || ''

    // Validate
    if (emp_id <= 0) {
      throw { errorCode: '#emp003', errorMessage: 'Employee not found.' }
    }

    if (emp_name.trim() !== '' && !validateName(emp_name.trim())) {
      throw { errorCode: '#emp001', errorMessage: 'Invalid input: Name is invalid. Please try again.' }
    }

    if (emp_email.trim() !== '' && !validateEmail(emp_email.trim())) {
      throw { errorCode: '#emp002', errorMessage: 'Invalid input: E-mail is invalid. Please try again.' }
    }

    const empStatus = emp_status.trim().toLowerCase()
    const allowedStatus: string[] = cst.emp_status // Assuming emp_status is an array of valid statuses
    if (emp_status !== '' && !allowedStatus.includes(empStatus)) {
      throw { errorCode: '#emp004', errorMessage: 'Invalid employee status.' }
    }

    const existingEmployee = await Employee.findOne({ where: { emp_id } })
    if (!existingEmployee) {
      throw { errorCode: '#emp003', errorMessage: 'Employee not found.' }
    }

    await Employee.update(
      {
        emp_name: emp_name !== '' ? emp_name : existingEmployee.emp_name,
        emp_email: emp_email !== '' ? emp_email : existingEmployee.emp_email,
        emp_status: emp_status !== '' ? emp_status : existingEmployee.emp_status,
      },
      { where: { emp_id } }
    )

    res.status(200).json({ message: 'Successfully updated employee data' })
  } catch (error: any) {
    console.error(error)
    res.status(400).json({
      errorCode: error.errorCode || cst.default_err_code,
      errorMessage: error.errorMessage || cst.default_err_message,
    })
  }
}

export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const emp_id = parseInt(req.params.id) || 0

    if (emp_id <= 0) {
      throw { errorCode: '#emp003', errorMessage: 'Employee not found.' }
    }

    const existingEmployee = await Employee.findOne({ where: { emp_id } })
    if (!existingEmployee) {
      throw { errorCode: '#emp003', errorMessage: 'Employee not found.' }
    }

    await existingEmployee.destroy()
    res.status(200).json({ message: 'Successfully deleted employee data' })
  } catch (error: any) {
    console.error(error)
    res.status(400).json({
      errorCode: error.errorCode || cst.default_err_code,
      errorMessage: error.errorMessage || cst.default_err_message,
    })
  }
}
