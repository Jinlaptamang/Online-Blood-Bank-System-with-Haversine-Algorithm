const { User } = require('../models/models');
const { listClosestDonors } = require('../services/donorService');

const getClosestDonors = async (req, res) => {
    try {
        const bankId = req.params.bankId;
        const requestedBG = req.params.requestedBG
        const donors = await listClosestDonors(bankId, requestedBG);
        res.status(200).json({ donors });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getClosestDonors };