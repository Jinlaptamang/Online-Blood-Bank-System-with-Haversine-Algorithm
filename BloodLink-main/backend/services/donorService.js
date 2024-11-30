const { Donations, BloodBank, User } = require('../models/models.js');
const haversineDistance = require('../utils/distanceCalulator.js');

// Define blood group compatibility
const bloodCompatibility = {
    "A+": { donateTo: ["A+", "AB+"], receiveFrom: ["A+", "A-", "O+", "O-"] },
    "O+": { donateTo: ["O+", "A+", "B+", "AB+"], receiveFrom: ["O+", "O-"] },
    "B+": { donateTo: ["B+", "AB+"], receiveFrom: ["B+", "B-", "O+", "O-"] },
    "AB+": { donateTo: ["AB+"], receiveFrom: ["Everyone"] },
    "A-": { donateTo: ["A+", "A-", "AB+", "AB-"], receiveFrom: ["A-", "O-"] },
    "O-": { donateTo: ["Everyone"], receiveFrom: ["O-"] },
    "B-": { donateTo: ["B+", "B-", "AB+", "AB-"], receiveFrom: ["B-", "O-"] },
    "AB-": { donateTo: ["AB+", "AB-"], receiveFrom: ["AB-", "A-", "B-", "O-"] },
};

const listClosestDonors = async (bankId, requestedBG) => {
    const bloodBank = await BloodBank.findById(bankId);
    if (!bloodBank) throw new Error("Blood Bank not found");

    const targetLat = bloodBank.latitude;
    const targetLon = bloodBank.longitude;

    // Get compatible blood groups for the requested blood group
    const compatibleBloodGroups = bloodCompatibility[requestedBG]?.receiveFrom;
    if (!compatibleBloodGroups) throw new Error("Invalid blood group requested");

    // Find donors with compatible blood groups
    const donations = await User.find({ bloodGroup: { $in: compatibleBloodGroups } });
    if (!donations.length) return "No donors found";

    // Calculate distance for each donor and return sorted list
    const donorDistances = donations.map(donation => {
        const distance = haversineDistance(targetLat, targetLon, donation.latitude, donation.longitude);
        return {
            name: donation.name,
            phone: donation.phone,
            bloodGroup: donation.bloodGroup,
            distance: distance.toFixed(2),
        };
    });

    donorDistances.sort((a, b) => a.distance - b.distance);

    return donorDistances;
};

module.exports = { listClosestDonors };
