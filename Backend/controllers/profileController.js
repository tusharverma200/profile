const Profile = require('../models/profileModel');

// Create a new profile
const createProfile = async (req, res) => {
    try {
        const profile = new Profile(req.body);
        await profile.save();
        res.status(201).send(profile);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all profiles
const getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).send(profiles);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a profile by ID
const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).send();
        }
        res.status(200).send(profile);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a profile by ID
const updateProfileById = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['profilePhoto', 'firstName', 'lastName', 'email', 'address'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).send();
        }

        updates.forEach((update) => (profile[update] = req.body[update]));
        await profile.save();
        res.status(200).send(profile);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a profile by ID
const deleteProfileById = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndDelete(req.params.id);
        if (!profile) {
            return res.status(404).send();
        }
        res.status(200).send(profile);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createProfile,
    getAllProfiles,
    getProfileById,
    updateProfileById,
    deleteProfileById,
};
