// Updated Routes with Image Upload Support
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Blog = require('../models/Blog');

// Configure multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
limits: {
    fileSize: 50 * 1024 * 1024, // 50MB instead of 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Create a new blog with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const blogData = {
      author: req.body.author,
      disclaimer: req.body.disclaimer,
      title: req.body.title,
      sections: JSON.parse(req.body.sections || '[]')
    };

    // Handle image upload
    if (req.file) {
      blogData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        filename: req.file.originalname
      };
    }

    const blog = new Blog(blogData);
    await blog.save();
    
    res.status(201).json({
      _id: blog._id,
      author: blog.author,
      disclaimer: blog.disclaimer,
      title: blog.title,
      sections: blog.sections,
      createdAt: blog.createdAt,
      hasImage: !!blog.image
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all blogs (without image data for performance)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find()
      .select('-image.data') // Exclude image data for list view
      .sort({ createdAt: -1 });
    
    const blogsWithImageInfo = blogs.map(blog => ({
      ...blog.toObject(),
      hasImage: !!blog.image,
      imageUrl: blog.image ? `/api/blogs/${blog._id}/image` : null
    }));
    
    res.json(blogsWithImageInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get blog by ID (without image data)
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).select('-image.data');
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    
    const blogResponse = {
      ...blog.toObject(),
      hasImage: !!blog.image,
      imageUrl: blog.image ? `/api/blogs/${blog._id}/image` : null
    };
    
    res.json(blogResponse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get blog image
router.get('/:id/image', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || !blog.image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.set('Content-Type', blog.image.contentType);
    res.set('Content-Disposition', `inline; filename="${blog.image.filename}"`);
    res.send(blog.image.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update blog with image
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      author: req.body.author,
      disclaimer: req.body.disclaimer,
      title: req.body.title,
      sections: JSON.parse(req.body.sections || '[]')
    };

    // Handle image update
    if (req.file) {
      updateData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        filename: req.file.originalname
      };
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-image.data');

    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    const blogResponse = {
      ...blog.toObject(),
      hasImage: !!blog.image,
      imageUrl: blog.image ? `/api/blogs/${blog._id}/image` : null
    };

    res.json(blogResponse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete blog by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
