const express = require("express");
const {  signUp, getAllConsultant } = require("../controllers/user.controller");
const { authenticateRoute } = require("../utils/jwtToken");
const router = express.Router();

// router.post('/login',login);
router.post("/signup", signUp);
// router.post("/logout", authenticateRoute, logout);
// router.get('/users',)
router.get('/get-all-consultant',getAllConsultant)


module.exports = router