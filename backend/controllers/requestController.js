const PowerRequest = require('../models/PowerRequest');
const User = require('../models/User');

const createRequest = async (req, res) => {
  try {
    const { area, powerRequired, purpose } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const pr = new PowerRequest({
      farmer: userId,
      farmerName: user.name,
      area,
      powerRequired,
      purpose
    });

    await pr.save();
    res.json(pr);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await PowerRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const getRequestsByFarmer = async (req, res) => {
  try {
    const userId = req.user.userId;
    const requests = await PowerRequest.find({ farmer: userId }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const approveRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const reqDoc = await PowerRequest.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });
    if (!reqDoc) return res.status(404).json({ msg: 'Request not found' });
    res.json(reqDoc);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const rejectRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const reqDoc = await PowerRequest.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true });
    if (!reqDoc) return res.status(404).json({ msg: 'Request not found' });
    res.json(reqDoc);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const deleteRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await PowerRequest.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ msg: 'Request not found' });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  getRequestsByFarmer,
  approveRequest,
  rejectRequest,
  deleteRequest
};
