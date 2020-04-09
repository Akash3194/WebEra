//ROUTES THROUGHOUT YOUR WEBSITE

const router = require("express").Router();

const userController = require("../controllers/user");
const { ensureGuest, ensureAuthenticated } = require("../libs/auth");

/* *** GET ENDPOINTS *** */

router.get(
  "/addbots/keyegwkleklrnrg32rn52n2lk3rn2lk3rnl3n2lr23lkn2lk2d",
  userController.getAddBots,
);
//router.get('/login', ensureGuest, userController.login);
//router.get('/profile', ensureGuest, userController.profile);

/* *** POST ENDPOINTS *** */
router.post("/login", userController.postLogin);
router.post("/register", userController.register);
router.post("/verifyemail", userController.verOtp);
router.post("/genotp", userController.genotp);
router.post("/resetpass", userController.passreset);
router.post("/logout", ensureAuthenticated, userController.logout);
router.post("/buy", ensureAuthenticated, userController.purchBot);
router.post(
  "/comp/:compId/bo/:botId",
  ensureAuthenticated,
  userController.getBotRep,
);
router.post(
  "/addbots/keyegwkleklrnrg32rn52n2lk3rn2lk3rnl3n2lr23lkn2lk2d",
  userController.postAddBots,
);
router.get("/user/:userId/userProfile", userController.getProfile);

/*router.post('/updateProfile', userController.postDet);  */
//router.post('/save', userController.postSave);
//router.post('/gotodate', userController.show);

// finish -> export
module.exports = router;
