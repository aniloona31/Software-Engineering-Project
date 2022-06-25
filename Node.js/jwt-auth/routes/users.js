const express = require('express');
const router = express.Router();
const passport = require('passport');
const {signUp,singIn,userAuth,checkRole,showProfile,signInGoogle,createSession} = require('../controllers/users_controller');

router.post('/sign-up/:role',signUp);
router.post('/sign-in/:role',singIn);
router.get('/profile',userAuth,showProfile);
router.get('/only-super-admin',userAuth,checkRole(["superadmin"]),showProfile)
router.get('/only-user',userAuth,checkRole(["user"]),showProfile)
router.post('/google/sign-in',signInGoogle)
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureMessage:"failed"}), createSession);
module.exports = router;