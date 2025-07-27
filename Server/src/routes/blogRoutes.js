// Updated Routes with Base64 Image Support
const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Helper function to validate and process base64 image
const processBase64Image = (base64Data) => {
  try {
    if (!base64Data) return null;
    
    // Check if it's a valid base64 image
    const isValidFormat = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/.test(base64Data);
    if (!isValidFormat) {
      throw new Error('Invalid image format. Only JPEG, PNG, GIF, and WebP are allowed.');
    }

    // Extract content type and filename
    const mimeMatch = base64Data.match(/^data:image\/([a-z]+);base64,/);
    const contentType = `image/${mimeMatch[1]}`;
    const extension = mimeMatch[1] === 'jpeg' ? 'jpg' : mimeMatch[1];
    const filename = `blog_image_${Date.now()}.${extension}`;

    // Get the base64 string without prefix
    const base64Image = base64Data.replace(/^data:image\/[a-z]+;base64,/, '');
    
    // Convert to buffer
    const buffer = Buffer.from(base64Image, 'base64');
    
    // Check file size (50MB limit)
    const sizeInMB = buffer.length / (1024 * 1024);
    if (sizeInMB > 50) {
      throw new Error('Image size must be less than 50MB.');
    }

    return {
      data: buffer,
      contentType: contentType,
      filename: filename
    };
  } catch (error) {
    throw new Error(`Image processing error: ${error.message}`);
  }
};

// Create a new blog with base64 image
router.post('/', async (req, res) => {
  try {
    const { author, disclaimer, title, sections, image } = req.body;

    // Validate required fields
    if (!author || !title) {
      return res.status(400).json({ error: 'Author and title are required fields' });
    }

    const blogData = {
      author: author.trim(),
      disclaimer: disclaimer?.trim() || '',
      title: title.trim(),
      sections: sections || []
    };

    // Process image if provided
    if (image) {
      try {
        const processedImage = processBase64Image(image);
        if (processedImage) {
          blogData.image = processedImage;
        }
      } catch (imageError) {
        return res.status(400).json({ error: imageError.message });
      }
    }

    const blog = new Blog(blogData);
    await blog.save();
    
    // Return blog data without image buffer for performance
    res.status(201).json({
      _id: blog._id,
      author: blog.author,
      disclaimer: blog.disclaimer,
      title: blog.title,
      sections: blog.sections,
      createdAt: blog.createdAt,
      hasImage: !!blog.image,
      imageUrl: blog.image ? `/api/blogs/${blog._id}/image` : null
    });
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(400).json({ error: err.message });
  }
});

// Get all blogs (without image data for performance)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, author, title } = req.query;
    
    // Build query filter
    const filter = {};
    if (author) {
      filter.author = { $regex: author, $options: 'i' };
    }
    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }

    const blogs = await Blog.find(filter)
      .select('-image.data') // Exclude image data for list view
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Blog.countDocuments(filter);
    
    const blogsWithImageInfo = blogs.map(blog => ({
      ...blog.toObject(),
      hasImage: !!blog.image,
      imageUrl: blog.image ? `/api/blogs/${blog._id}/image` : null,
      // Add image metadata without the actual data
      imageInfo: blog.image ? {
        contentType: blog.image.contentType,
        filename: blog.image.filename,
        size: blog.image.data ? blog.image.data.length : 0
      } : null
    }));
    
    res.json({
      success: true,
      data: blogsWithImageInfo,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        limit: parseInt(limit)
      }
    });
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get blog by ID (without image data)
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).select('-image.data');
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    const blogResponse = {
      ...blog.toObject(),
      hasImage: !!blog.image,
      imageUrl: blog.image ? `/api/blogs/${blog._id}/image` : null,
      imageInfo: blog.image ? {
        contentType: blog.image.contentType,
        filename: blog.image.filename
      } : null
    };
    
    res.json({
      success: true,
      data: blogResponse
    });
  } catch (err) {
    console.error('Error fetching blog:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get blog image
router.get('/:id/image', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog || !blog.image || !blog.image.data) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Set appropriate headers
    res.set('Content-Type', blog.image.contentType);
    res.set('Content-Disposition', `inline; filename="${blog.image.filename}"`);
    res.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    res.set('ETag', `"${blog._id}-${blog.createdAt.getTime()}"`);
    
    res.send(blog.image.data);
  } catch (err) {
    console.error('Error fetching blog image:', err);
    res.status(500).json({ error: err.message });
  }
});

// Update blog with base64 image
router.put('/:id', async (req, res) => {
  try {
    const { author, disclaimer, title, sections, image } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Prepare update data
    const updateData = {};
    
    if (author !== undefined) updateData.author = author.trim();
    if (disclaimer !== undefined) updateData.disclaimer = disclaimer.trim();
    if (title !== undefined) updateData.title = title.trim();
    if (sections !== undefined) updateData.sections = sections;

    // Handle image update
    if (image !== undefined) {
      if (image === null || image === '') {
        // Remove image if explicitly set to null or empty
        updateData.image = undefined;
        updateData.$unset = { image: 1 };
      } else {
        // Process new image
        try {
          const processedImage = processBase64Image(image);
          if (processedImage) {
            updateData.image = processedImage;
          }
        } catch (imageError) {
          return res.status(400).json({ error: imageError.message });
        }
      }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData.image === undefined && updateData.$unset ? 
        { ...updateData, $unset: updateData.$unset } : 
        updateData,
      { new: true, runValidators: true }
    ).select('-image.data');

    const blogResponse = {
      ...updatedBlog.toObject(),
      hasImage: !!updatedBlog.image,
      imageUrl: updatedBlog.image ? `/api/blogs/${updatedBlog._id}/image` : null
    };

    res.json({
      success: true,
      data: blogResponse,
      message: 'Blog updated successfully'
    });
  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(400).json({ error: err.message });
  }
});

// Delete blog by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!deletedBlog) {
      return res.status(404).json({ 
        success: false,
        error: 'Blog not found' 
      });
    }
    
    res.json({ 
      success: true,
      message: 'Blog deleted successfully',
      data: {
        deletedId: req.params.id,
        title: deletedBlog.title
      }
    });
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

// Get blog statistics
router.get('/admin/stats', async (req, res) => {
  try {
    const stats = await Blog.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          totalWithImages: {
            $sum: {
              $cond: [{ $ifNull: ["$image", false] }, 1, 0]
            }
          }
        }
      }
    ]);

    const authorStats = await Blog.aggregate([
      {
        $group: {
          _id: '$author',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]);

    res.json({
      success: true,
      data: {
        overview: stats[0] || {
          total: 0,
          totalWithImages: 0
        },
        topAuthors: authorStats
      }
    });
  } catch (err) {
    console.error('Error fetching blog stats:', err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

module.exports = router;