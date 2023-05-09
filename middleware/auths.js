// const bcrypt = require('bcrypt');
let jwt = require("jsonwebtoken");
// const User = require('./models/User');

// const login = async (req, res) => {
//     const { username, password } = req.body;
  
//     // Find user in database
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }
  
//     // Compare password with hashed password from database
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }
  
//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  
//     // Store token in cookie
//     res.cookie('token', token, { httpOnly: true });
  
//     // Send response
//     return res.json({ message: 'Successfully logged in' });
//   };

  
let checkJWT = (req, res, next) => {
    let headerValue = req.get.auhtorization
    // let headerValue = req.get("Authorization")
    let signedToken;

    if(headerValue){
        // Authorization header reads "Bearer asjsdlksajdlk"
        let parts = headerValue.split(" ");
        //"Bearer" is index[0]
        signedToken = parts[1];
    }

    if(!signedToken){
        console.log("Missing signed token.");
        res.sendStatus(403);
        return;
    }

    // If I get to this line, verify the secret
    try {
        let unsigned = jwt.verify(signedToken, process.env.JWT_SECRET)
        req.userInfo = unsigned;
    }  catch (err){
        console.log("Failed to verify token ", err)
        res.sendStatus(403);
        return;
    }

    //if we get here, we know there is a signedToken or else it would have failed on line 16
    //Token is valid, so go to bext task in the chain

    next();
}



module.exports = {login, checkJWT}