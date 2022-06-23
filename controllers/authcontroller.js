const express = require('express');
const router = express.Router();
const BaseResponse = require('../utilities/response');
const { isEmpty } = require('lodash');
const moment = require('moment');
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const response = require('../utilities/response');



router.get('/', (req, res) => {
    try {
        return res.status(200).json(BaseResponse.sendSuccess('Auth service is working.'));
    } catch (err) {
        return res.status(400).json(BaseResponse.sendError('Error', err));
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = user.findOne({
            where: {
                email:req.body.email
            }
        })
            .then(async(userData) => {
                if(!userData) {
                    return res.status(ErrorMessage.userNotExists.code).json(BaseResponse.sendError(ErrorMessage.userNotExists.message));
                }
                bcrypt.compare(req.body.password, user.password,(err, result) => {
                    if(!result){
                        return res.status(ErrorMessage.passwordmatchingfailed.code).json(BaseResponse.sendError(ErrorMessage.passwordmatchingfailed.message));
                    }else{
                        const token =jwt.sign({
                            _id:user.id,
                            email : user.email,
                            userType:user.userType,
                            phone:user.phone,

                        },
                            'This is dummy text',
                            {
                                expiresIn:"24hr"
                            }
                        );
                        response.status(200).json({
                            email :user.email,
                            userType : user.userType,
                            phone:user.phone,
                            token : token
                        })
                    }            

                })
            })
            .catch(err => res.status(ErrorMessage.badRequest.code).json(BaseResponse.sendError(ErrorMessage.badRequest.message, err)));
    } catch (err) {
        return res.status(ErrorMessage.badRequest.code).json(BaseResponse.sendError(ErrorMessage.badRequest.message, err));
    }
});

router.post('/register', async (req, res) => {
    try {
        bcrypt.hash(req.body.password, 10, (err, hash) =>{
            if(err){
                return res.status(500).json({
                error:err    
                })
            }else{
                const user = new User({
                    _id:new mongoose.Types.ObjectId,
                    email:req.body.email,
                    password:hash,
                    phone:req.body.phone,
                    userType:req.body.userType,
                    
                })
                user.save(function(err, data) {
                    if (err) {
                        return res.status(400).json(BaseResponse.sendError('Error', err));
                    } else {
                        return res.status(200).json(BaseResponse.sendSuccess('Message saved.',data));
                    }
                });
            }
        });
    } catch (err) {
        return res.status(ErrorMessage.badRequest.code).json(BaseResponse.sendError(ErrorMessage.badRequest.message, err));
    }
});

module.exports = router;