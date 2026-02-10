import { Router } from 'express';
import { signup, login, logout } from '../controllers/authController';

const router = Router();

/**
 * @route   POST /api/auth/signup
 * @desc    User signup (create new account)
 * @access  Public
 */
router.post('/signup', signup);

/**
 * @route   POST /api/auth/login
 * @desc    User login
 * @access  Public
 */
router.post('/login', login);

/**
 * @route   POST /api/auth/logout
 * @desc    User logout
 * @access  Private (requires authentication)
 */
router.post('/logout', logout);

export default router;
