// Updated Blog Schema with Base64 Image Support
const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true,
    enum: ['paragraph', 'heading', 'list', 'steps']
  },
  title: {
    type: String,
    trim: true,
    maxlength: [200, 'Section title cannot exceed 200 characters']
  },
  text: {
    type: String,
    trim: true,
    maxlength: [5000, 'Section text cannot exceed 5000 characters']
  },
  items: [{
    type: String,
    trim: true,
    maxlength: [500, 'Item cannot exceed 500 characters']
  }],
  subitems: [{
    subheading: {
      type: String,
      trim: true,
      maxlength: [200, 'Subheading cannot exceed 200 characters']
    },
    points: [{
      type: String,
      trim: true,
      maxlength: [500, 'Point cannot exceed 500 characters']
    }]
  }]
}, { _id: false });

const BlogSchema = new mongoose.Schema({
  author: { 
    type: String, 
    required: [true, 'Author is required'],
    trim: true,
    maxlength: [100, 'Author name cannot exceed 100 characters']
  },
  disclaimer: {
    type: String,
    trim: true,
    maxlength: [1000, 'Disclaimer cannot exceed 1000 characters']
  },
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
    index: true // Add index for faster searches
  },
  image: { 
    data: {
      type: Buffer,
      required: function() {
        return this.image && (this.image.contentType || this.image.filename);
      }
    },
    contentType: {
      type: String,
      required: function() {
        return this.image && this.image.data;
      },
      enum: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    },
    filename: {
      type: String,
      required: function() {
        return this.image && this.image.data;
      },
      trim: true
    }
  },
  sections: {
    type: [SectionSchema],
    validate: {
      validator: function(sections) {
        return sections && sections.length > 0;
      },
      message: 'At least one section is required'
    }
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    index: true // Add index for sorting
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { updatedAt: true } // Automatically update updatedAt field
});

// Index for faster queries
BlogSchema.index({ author: 1, createdAt: -1 });
BlogSchema.index({ title: 'text', author: 'text' }); // Text search index

// Pre-save middleware to validate image size
BlogSchema.pre('save', function(next) {
  if (this.image && this.image.data) {
    // Check image size (50MB limit)
    const sizeInMB = this.image.data.length / (1024 * 1024);
    if (sizeInMB > 50) {
      const error = new Error('Image size cannot exceed 50MB');
      error.name = 'ValidationError';
      return next(error);
    }
  }
  next();
});

// Pre-save middleware to update timestamps
BlogSchema.pre('save', function(next) {
  if (!this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

// Virtual for image URL
BlogSchema.virtual('imageUrl').get(function() {
  return this.image ? `/api/blogs/${this._id}/image` : null;
});

// Virtual for image size in MB
BlogSchema.virtual('imageSizeMB').get(function() {
  return this.image && this.image.data ? 
    (this.image.data.length / (1024 * 1024)).toFixed(2) : null;
});

// Method to get blog without image data
BlogSchema.methods.toSafeObject = function() {
  const obj = this.toObject();
  if (obj.image) {
    obj.hasImage = true;
    obj.imageUrl = `/api/blogs/${this._id}/image`;
    obj.imageInfo = {
      contentType: obj.image.contentType,
      filename: obj.image.filename,
      size: obj.image.data ? obj.image.data.length : 0
    };
    delete obj.image.data; // Remove binary data
  } else {
    obj.hasImage = false;
    obj.imageUrl = null;
  }
  return obj;
};

// Static method to find blogs with pagination
BlogSchema.statics.findWithPagination = function(filter = {}, options = {}) {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    includeImageData = false
  } = options;

  const skip = (page - 1) * limit;
  const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };
  
  let selectFields = includeImageData ? {} : { 'image.data': 0 };

  return Promise.all([
    this.find(filter)
      .select(selectFields)
      .sort(sort)
      .skip(skip)
      .limit(limit),
    this.countDocuments(filter)
  ]).then(([blogs, total]) => ({
    blogs,
    pagination: {
      current: page,
      pages: Math.ceil(total / limit),
      total,
      limit
    }
  }));
};

module.exports = mongoose.model('Blog', BlogSchema);