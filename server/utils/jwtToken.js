const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

 const genrateToken = async()=>{
    const token = await jwt.sign( data,process.env.JWT_TOKEN_SECRET_KEY );
    res.cookie( 'jwt',token,{
        httpOnly:true,
        secure: true,
        sameSite: strict
    })
}


 const authenticateRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid Token" });
    }
    const user = await User.findById(decoded.userId).select("-password"); // current loggedin user
    if (!user) {
      return res.status(401).json({ error: "No user found" });
    }
    req.user = user;
    next();
  } 
  catch (error) {
    console.log("Error in secureRoute: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  genrateToken,
  authenticateRoute
}