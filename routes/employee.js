const express = require('express')
const employeeContoller = require('../controllers/employee')

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         emp_id:
 *           type: integer
 *         emp_name:
 *           type: string
 *         emp_email:
 *           type: string
 *         emp_status:
 *           type: string
 *         emp_joined_date:
 *           type: string
 *           format: date-time
 *       required:
 *         - emp_name
 *         - emp_email
 *         - emp_status
 */

/**
 * @swagger
 * /employee/create:
 *   post:
 *     summary: Create an employee
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid input
 */
router.post('/create', employeeContoller.createEmployee)

/**
 * @swagger
 * /employee/all:
 *   get:
 *     summary: Retrieve all employees
 *     tags: [Employee]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: false
 *         description: Keyword to search employees
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employees:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *       500:
 *         description: Internal server error
 */
router.get('/all', employeeContoller.getAllEmployee)

/**
 * @swagger
 * /employee/update:
 *   put:
 *     summary: Update an employee
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Invalid input
 */
router.put('/update', employeeContoller.updateEmployee)

/**
 * @swagger
 * /employee/delete/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The employee ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete('/delete/:id', employeeContoller.deleteEmployee)

module.exports = router
