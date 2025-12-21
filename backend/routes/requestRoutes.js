const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const rc = require('../controllers/requestController');

// Farmer creates request
router.post('/', auth, authorizeRoles('farmer'), rc.createRequest);

// Farmer: view own requests
router.get('/me', auth, authorizeRoles('farmer'), rc.getRequestsByFarmer);

// Admin: view all requests
router.get('/', auth, authorizeRoles('admin'), rc.getAllRequests);

// Admin approve/reject/delete
router.put('/:id/approve', auth, authorizeRoles('admin'), rc.approveRequest);
router.put('/:id/reject', auth, authorizeRoles('admin'), rc.rejectRequest);
router.delete('/:id', auth, authorizeRoles('admin'), rc.deleteRequest);

module.exports = router;
