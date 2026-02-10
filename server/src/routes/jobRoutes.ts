import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @route   GET /api/jobs
 * @desc    Get all jobs with filtering and pagination
 * @access  Public
 */
router.get('/', (req, res) => {
    res.json({ message: 'Get all jobs' });
});

/**
 * @route   GET /api/jobs/:id
 * @desc    Get a single job by ID
 * @access  Public
 */
router.get('/:id', (req, res) => {
    res.json({ message: 'Get job by ID' });
});

/**
 * @route   POST /api/jobs
 * @desc    Create a new job (recruiter only)
 * @access  Private (recruiter)
 */
router.post('/', authenticate, authorize('recruiter'), (req, res) => {
    res.json({ message: 'Create job' });
});

/**
 * @route   PUT /api/jobs/:id
 * @desc    Update a job (recruiter only)
 * @access  Private (recruiter)
 */
router.put('/:id', authenticate, authorize('recruiter'), (req, res) => {
    res.json({ message: 'Update job' });
});

/**
 * @route   DELETE /api/jobs/:id
 * @desc    Delete a job (recruiter only)
 * @access  Private (recruiter)
 */
router.delete('/:id', authenticate, authorize('recruiter'), (req, res) => {
    res.json({ message: 'Delete job' });
});

export default router;
