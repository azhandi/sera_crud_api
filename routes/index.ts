import express, { Request, Response } from 'express'
import employeeRoutes from './employee'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!')
})

router.use('/employee', employeeRoutes)

export default router
