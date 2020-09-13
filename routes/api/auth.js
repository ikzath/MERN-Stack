const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('.././middleware/auth');


//User Model
const User = require('../../models/User');

//@route POST API/auth
//@descp authenticate existing user
//access public
router.post('/', (req,res)=>{
const { email, password } = req.body;
const config = require('config');
const jwt = require('jsonwebtoken');


//Simple validation 
if(  !email || !password ) {
   return res.status(400).json({ msg: 'Missings all fields'});     
}

// Check for existing user
User.findOne({ email })
   .then(user => {
    if(!user) return res.status(400).json({ message: 'User does not exists'});
  
// validate user
bcrypt.compare(password, user.password)
  .then((isMatch) => {
      if(!isMatch) return res.status(400).json({ msg: 'Passwords do not match'});

      jwt.sign(
        { id: user.id },
         config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token)=> {
            if(err) throw err;

            res.json({
                token: token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
           });
        }
    )
  });


})
});

//@route GET api/auth/user
//@descp get user data
//access purivate
router.get('/user', auth, (req, res)=> {
User.findById(req.user.id)
.select('-password')
.then(user => res.json(user));

});

   
module.exports = router;