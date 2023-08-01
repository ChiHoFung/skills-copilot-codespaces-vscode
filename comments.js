// Create web server

// Import modules
const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')
const Post = require('../models/post')
const User = require('../models/user')
const checkLogin = require('../middlewares/check').checkLogin

// POST /comments/create
// Create a comment

router.post('/create', checkLogin, function (req, res, next) {
  const author = req.session.user._id
  const postId = req.fields.postId
  const content = req.fields.content

  try {
    if (!content.length) {
      throw new Error('Please fill in the comment content')
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }

  const comment = {