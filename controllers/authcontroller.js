const express = require('express');
const router = express.Router();

const BaseResponse = require('../utilities/response');
//const { ErrorMessage } = require('../constants');
const { isEmpty } = require('lodash');
const moment = require('moment');
const axios = require('axios');



router.get('/', (req, res) => {
    try {
        return res.status(200).json(BaseResponse.sendSuccess('Auth service is working.'));
    } catch (err) {
        return res.status(400).json(BaseResponse.sendError('Error', err));
    }
});

router.post('/login', checkJwt, (req, res) => {
    try {
        const { email, password } = req.body;
        
        //const usremail


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

                user.save()
                .then(result =>{
                    res.status(200).json({
                        newUser : result
                    })
                })
                .catch(err =>{
                    res.status(500).json({
                        error:err
                    })
                })
            }
        });
    } catch (err) {
        return res.status(ErrorMessage.badRequest.code).json(BaseResponse.sendError(ErrorMessage.badRequest.message, err));
    }
});