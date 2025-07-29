const User = require('../models/Users');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');


exports.register = async(req, res)=> {
    const { email, phone, password, role } = req.body
    try {
        const userExist = await User.findOne({ $or: [{ email }, { phone }] })
        if (userExist) return res.status(400).json({message : 'User alreaady exists'})
        
        const user = await User.create({ email, phone, password, role })
        res.status(201).json({
            id: user._id,
            token :generateToken(user),
            verificationCode: '123456',
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.login = async(req, res) =>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email})
        if (!user) return res.status(401).json({message : 'Invalid credentials'})
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(401).json({message : 'Invalid credentials'})
        
        return res.status(201).json({
            id: user._id,
            token : generateToken(user)})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.verifyOTP = async (req, res) => {
  const { phone,email, code } = req.body;
  if (code !== '123456') return res.status(400).json({ message: 'Invalid OTP' });

  await User.findOneAndUpdate({ $or: [{ phone }, { email }] }, { isVerified: true });
  res.json({ message: 'Verified successfully' });
};