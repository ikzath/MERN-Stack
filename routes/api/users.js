const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//User Model
const User = require('../../models/User');

//@route POST API/users
//@desc register new user
//access public
router.post('/', (req,res)=>{
const { name, email, password } = req.body;
const config = require('config');
const jwt = require('jsonwebtoken');


//Simple validation 
if( !name || !email || !password ) {
   return res.status(400).json({ msg: 'Missings all fields'});     
}

// Check for existing user
User.findOne({ email })
   .then(user => {
    if(user) return res.status(400).json({ message: 'User already exists'});
  
const newUser = new User({
     name,
     email,
     password
});    
    
// create hash & salt
bcrypt.genSalt(10, (err, salt)=> {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save()
        .then(user => {
       
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
    });
});


})
});
   
module.exports = router;