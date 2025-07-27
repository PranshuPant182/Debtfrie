

// routes/testimonials.js
const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');

// Helper function to validate base64 image
const validateBase64Image = (base64Data) => {
    try {
        // Check if it's a valid base64 image
        const isValidFormat = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/.test(base64Data);
        if (!isValidFormat) {
            return { 
                valid: false, 
                error: 'Invalid image format. Only JPEG, PNG, GIF, and WebP are allowed.' 
            };
        }

        // Get the base64 string without prefix
        const base64Image = base64Data.replace(/^data:image\/[a-z]+;base64,/, '');
        
        // Check if it's valid base64
        const buffer = Buffer.from(base64Image, 'base64');
        
        // Check file size (5MB limit)
        const sizeInMB = buffer.length / (1024 * 1024);
        if (sizeInMB > 5) {
            return { 
                valid: false, 
                error: 'Image size must be less than 5MB.' 
            };
        }

        return { valid: true };
    } catch (error) {
        return { 
            valid: false, 
            error: 'Invalid base64 image data.' 
        };
    }
};

// GET /api/testimonials - Fetch all testimonials
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, rating } = req.query;
        
        const query = {};
        
        // Filter by rating if provided
        if (rating) {
            query.rating = { $gte: parseFloat(rating) };
        }

        const testimonials = await Testimonial.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .select('-__v'); // Exclude version key

        const total = await Testimonial.countDocuments(query);

        res.status(200).json({
            success: true,
            data: testimonials,
            pagination: {
                current: page,
                pages: Math.ceil(total / limit),
                total,
                limit
            }
        });
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch testimonials',
            error: error.message
        });
    }
});

// POST /api/testimonials - Add new testimonial
router.post('/', async (req, res) => {
    try {
        const { name, image, rating, text } = req.body;

        // Basic validation
        if (!name || !image || !rating || !text) {
            return res.status(400).json({
                success: false,
                message: 'Name, image, rating, and text are all required fields'
            });
        }

        // Validate rating range
        const ratingNum = parseFloat(rating);
        if (ratingNum < 1 || ratingNum > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

        // Validate base64 image
        const imageValidation = validateBase64Image(image);
        if (!imageValidation.valid) {
            return res.status(400).json({
                success: false,
                message: imageValidation.error
            });
        }

        // Create testimonial object
        const testimonialData = {
            name: name.trim(),
            image: image,
            rating: ratingNum,
            text: text.trim()
        };

        // Save to database
        const testimonial = new Testimonial(testimonialData);
        await testimonial.save();

        res.status(201).json({
            success: true,
            message: 'Testimonial submitted successfully!',
            data: testimonial
        });

    } catch (error) {
        console.error('Error creating testimonial:', error);
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to create testimonial',
            error: error.message
        });
    }
});

// GET /api/testimonials/:id - Get single testimonial
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const testimonial = await Testimonial.findById(id).select('-__v');

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found'
            });
        }

        res.status(200).json({
            success: true,
            data: testimonial
        });
    } catch (error) {
        console.error('Error fetching testimonial:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch testimonial',
            error: error.message
        });
    }
});

// PUT /api/testimonials/:id - Update testimonial
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, rating, text } = req.body;

        // Validate rating if provided
        if (rating) {
            const ratingNum = parseFloat(rating);
            if (ratingNum < 1 || ratingNum > 5) {
                return res.status(400).json({
                    success: false,
                    message: 'Rating must be between 1 and 5'
                });
            }
        }

        // Validate image if provided
        if (image) {
            const imageValidation = validateBase64Image(image);
            if (!imageValidation.valid) {
                return res.status(400).json({
                    success: false,
                    message: imageValidation.error
                });
            }
        }

        const updateData = {};
        if (name) updateData.name = name.trim();
        if (image) updateData.image = image;
        if (rating) updateData.rating = parseFloat(rating);
        if (text) updateData.text = text.trim();

        const testimonial = await Testimonial.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Testimonial updated successfully',
            data: testimonial
        });
    } catch (error) {
        console.error('Error updating testimonial:', error);
        
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to update testimonial',
            error: error.message
        });
    }
});

// DELETE /api/testimonials/:id - Delete testimonial
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const testimonial = await Testimonial.findByIdAndDelete(id);

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Testimonial deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete testimonial',
            error: error.message
        });
    }
});

// GET /api/testimonials/stats - Get basic statistics
router.get('/admin/stats', async (req, res) => {
    try {
        const stats = await Testimonial.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    avgRating: { $avg: '$rating' }
                }
            }
        ]);

        const ratingDistribution = await Testimonial.aggregate([
            {
                $group: {
                    _id: '$rating',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: -1 }
            }
        ]);

        res.status(200).json({
            success: true,
            data: {
                overview: stats[0] || {
                    total: 0,
                    avgRating: 0
                },
                ratingDistribution
            }
        });
    } catch (error) {
        console.error('Error fetching testimonial stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch testimonial statistics',
            error: error.message
        });
    }
});

module.exports = router;