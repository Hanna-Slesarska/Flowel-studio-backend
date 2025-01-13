const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel');

// @route    POST /api/reviews
// @desc     Add a new review
// @access   Public
router.post('/', async (req, res) => {
    try {
      const { name, review, image } = req.body;
  
      // Validate required fields
      if (!name || !review) {
        return res.status(400).json({ message: 'Name and review are required' });
      }
  
      // Save to database
      const newReview = new Review({ name, review, image });
      await newReview.save();
  
      res.status(201).json(newReview);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

// @route    GET /api/reviews
// @desc     Get all reviews
// @access   Public
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
