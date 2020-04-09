//FOR HOME PAGE 

//CHANGE LINK FOR DEFAULT IP AND PORT
const router = require('express').Router();
const userController = require('../controllers/user');
const { ensureGuest, ensureAuthenticated } = require('../libs/auth');



// basics routes
router.get('/',ensureGuest, (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => res.json(user))
    .catch(err => {
      res.status(404).json(err);
    });
});

module.exports = router;
