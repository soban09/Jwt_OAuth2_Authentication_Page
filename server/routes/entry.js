import express from 'express'
import { register, login, authenticate } from '../controllers/entry.js'
import {auth} from '../middleware/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/auth', auth, authenticate)


export default router