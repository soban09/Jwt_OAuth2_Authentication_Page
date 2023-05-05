import express from 'express'
import { extractUser, updateUser } from '../controllers/user.js'

const router = express.Router()
router.get('/:id', extractUser)
router.patch('/:id', updateUser)

export default router