const cloudinary = require('../config/cloudinary');

exports.uploadMovie = async (req, res) => {
    try {
        const file = req.file;

        const result = await cloudinary.uploader.upload(file.path, {
            resource_type: 'video',
        });

        res.json({
            video_url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};