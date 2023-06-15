const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Student = require('../models/student')

//student login

exports.login = async (req,res) =>{
    try{
        const {email, password} = req.body;
    
     // Check if student exists
    const student = await Student.findOne({email})
    if (!student){
        return res.status(401).json({error: 'Invalid email or password'});
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, student.password);
    if (!passwordMatch){
        return res.status(401).json({error: 'Invalid email or password'});
    }

    // create and send the JWT token

    const token = jwt.sign({id: student._id}, 'your-secret-key');
    res.json({ token })
}
    catch(error){
        console.error(error);
    }
    res.status(500).json({ error: 'An error occurred while processing the student login' });

}