const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");
const passport = require("passport");
const { authenticate } = require("../middleware/authMiddleware.js");
const userController = require("../controllers/userController");

router.post("/register", registerValidator, authController.register);
router.post("/login", loginValidator, authController.login);

router.get("/google", authController.googleAuth);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleAuthCallback
);

router.get("/github", authController.githubAuth);
router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  authController.githubAuthCallback
);

router.get("/profile", authenticate, userController.getUserProfile);
router.put("/profile", authenticate, userController.updateUserProfile);

router.post("/refresh-token", authController.refreshAccessToken);

router.put(
  "/change-password",
  authenticate,
  //   passwordChangeValidator,
  userController.changePassword
);
router.post("/logout", authenticate, userController.logout);

module.exports = router;
