const express = require('express');
const router = express.Router();
const Profile = require('../models/profileModel');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables

// Multer configuration for local storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // specify the destination directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // specify the filename
    },
});
const upload = multer({ storage: storage });

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a new profile
router.post('/profiles', upload.single('profilePhoto'), async (req, res) => {
    try {
        console.log(req);
        if (!req.file) {
            console.error('No file uploaded', req);
            return res.status(400).json({ error: 'No file uploaded', req });
        }
        // console.log(__dirname);
        const parentDir = path.join(__dirname, '..');
        const filePath = path.join(parentDir, 'uploads', req.file.filename);
        console.log(`Uploading file from path: ${filePath}`);

        // Upload image to Cloudinary from local file
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'uploads'
        });

        console.log(`File uploaded to Cloudinary: ${result.secure_url}`);

        // Delete the file from local storage after uploading to Cloudinary
        fs.unlinkSync(filePath);

        // Create a new profile in the database
        const newProfile = new Profile({
            profilePhoto: result.secure_url,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            address: req.body.address
        });

        await newProfile.save();

        // Send the new profile in the response
        res.status(201).json(newProfile);

    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).json({ error: 'Error uploading image to Cloudinary' });
    }
});

// Get all profiles
router.get('/profiles', async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).send(profiles);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a profile by ID
router.get('/profiles/:id', async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).send();
        }
        res.status(200).send(profile);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a profile by ID
router.patch('/profiles/:id', async (req, res) => {
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
});

// Delete a profile by ID
router.delete('/profiles/:id', async (req, res) => {
    try {
        const profile = await Profile.findByIdAndDelete(req.params.id);
        if (!profile) {
            return res.status(404).send();
        }
        res.status(200).send(profile);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
