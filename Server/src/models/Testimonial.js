const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    image: {
        type: String, // Will store base64 string
        required: [true, 'Image is required']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5']
    },
    text: {
        type: String,
        required: [true, 'Testimonial text is required'],
        trim: true,
        maxlength: [1000, 'Testimonial text cannot exceed 1000 characters']
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

// Index for faster queries
testimonialSchema.index({ createdAt: -1 });
testimonialSchema.index({ rating: -1 });

// Pre-save middleware to validate image size
testimonialSchema.pre('save', function(next) {
    if (this.image) {
        // Calculate base64 size (approximately)
        const base64Size = this.image.length * 0.75;
        
        // 5MB limit
        if (base64Size > 5 * 1024 * 1024) {
            const error = new Error('Image size too large. Maximum size is 5MB.');
            error.name = 'ValidationError';
            return next(error);
        }
    }
    next();
});

module.exports = mongoose.model('Testimonial', testimonialSchema);