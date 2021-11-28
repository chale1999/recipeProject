const crypto = require('crypto');
const { query } = require('express');
const Users = require('../models/User');
const sendEmail = require('../utils/sendEmail');




exports.register = async(req, res, next) => {
    const {firstName, lastName, username, email, password} = req.body;
    try{
        const user = await Users.create({
            firstName, lastName, username, email, password
        });

        try{
    
            const verifyToken = user.getEmailVerifyToken();
    
            await user.save();
    
            const verifyUrl = `https://sheltered-wildwood-67909.herokuapp.com/emailverify/${verifyToken}`;
    
            const message = `
                <h1>Thanks for joining MegaBytes!</h1>
                <p>Please go to this link to confirm your email</p>
                <a href=${verifyUrl} clicktracking=off>${verifyUrl}</a>
            `;
    
            try{
                await sendEmail({
                    to: user.email,
                    subject: "Email Verification MegaBytes",
                    text: message
                });

                console.log("Email Sent");
    
            }catch(error){
                user.verifyEmailToken = undefined;
                await user.save();
                return res.status(500).json({
                    success : false,
                    error: "Email Could Not Be Synced",
                });
            }
        }catch(error){
            return res.status(500).json({
                success : false,
                error: error.message,
            });
        }
        sendToken(user, 200, res);
    } catch(error){
        return res.status(500).json({
            success : false,
            error: "Username or Email taken.",
        });
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body

    if(!email || !password){
        res.status(400).json({success : false, error: "Please provide email and password"});
    }

    try{
        const user = await Users.findOne({email}).select("+password");

        if(!user) {
            res.status(401).json({success: false, error: "Invalid credentials"});
        }

        const isMatch = await user.matchPasswords(password);

        if(!isMatch) {
            res.status(401).json({success: false, error: "Invalid credentials"});
        }

        sendToken(user, 200, res);
    }catch(error){
        res.status(500).json({
            success : false,
            error: error.message,
        });
    }
};

exports.forgotpassword = async (req, res, next) => {
    const { email } = req.body;

    try{
        const user = await Users.findOne({email});

        if(!user){
            res.status(404).json({success: false, error: "Email could not be sent"});
        }

        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetUrl = `https://sheltered-wildwood-67909.herokuapp.com/passwordreset/${resetToken}`;

        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;

        try{
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message
            });
    
            res.status(200).json({ success: true, data:"Email Sent"});
        }catch(error){
            user.getResetPasswordToken = undefined;
            user.getResetPasswordExpire = undefined;
            await user.save();
            res.status(500).json({
                success : false,
                error: "Email Could Not Be Synced",
            });
        }
    }catch(error){
        res.status(500).json({
            success : false,
            error: error.message,
        });
    }
};

exports.resetpassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try{
        const user = await Users.findOne({
            resetPasswordToken,
            // expiration date is greater than current time and still valid
            getResetPasswordExpire: { $gt: Date.now()}
        });

        if(!user) {
            res.status(404).json({ success: false, error: "Invalid Reset Token"})
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.getResetPasswordExpire = undefined;
        
        await user.save();
        res.status(201).json({ success: true, data: "Password Successfully Reset."});
    }catch(error){
        res.status(500).json({ success: false, error: error.message});
    }
};


exports.verifyemail = async (req, res, next) => {
    const verifyToken = crypto.createHash("sha256").update(req.params.verifyToken).digest("hex");

    try{
        const user = await Users.findOne({verifyEmailToken: verifyToken});

        if(!user) {
            res.status(404).json({ success: false, error: "Invalid Token"})
        }

        user.isVerified = true;
        
        await user.save();
        res.status(201).json({ success: true, data: "Email Successfully Verified."});
    }catch(error){
        res.status(500).json({ success: false, error: error.message});
    }
};


const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success: true, token});
}
