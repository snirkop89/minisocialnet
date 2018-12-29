const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load models
const Profile = require('../../models/Profile')
const User = require('../../models/User')

//@route GET api/profile/test
//@desc Tests profile route
//@access Public
router.get('/test', (req, res) => {
  return res.json({ msg: 'Profile works' })
})

//@route GET api/profile/
//@desc Get current user's profile
//@access Public
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const errors = {}
    try {
      const profile = await Profile.findOne({ user: req.user.id })

      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }

      res.json(profile)
    } catch (err) {
      res.status(404).json({ err })
    }
  }
)

module.exports = router
