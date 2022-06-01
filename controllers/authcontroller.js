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
        


    } catch (err) {
        return res.status(ErrorMessage.badRequest.code).json(BaseResponse.sendError(ErrorMessage.badRequest.message, err));
    }
});

router.post('/register', (req, res) => {
    try {
        const { userId, firstName, lastName, email,
            mobileNumber, gender, address, country,
            state, profileImage, city } = req.body;

        const params = {
            TableName: 'users',
            Item: {
                userId,
                id: uuid(),
                firstName,
                lastName,
                email,
                mobileNumber,
                gender,
                address,
                country,
                state,
                profileImage,
                city,
                createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                updatedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                status: true,
                isActive: true,
                isChatActive: false
            }
        };
        dbClient.put(params, (err, data) => {
            if (err) {
                return res.status(400).json(BaseResponse.sendError('Error', err));
            } else {
                return res.status(200).json(BaseResponse.sendSuccess('User added.'));
            }
        });

    } catch (err) {
        return res.status(ErrorMessage.badRequest.code).json(BaseResponse.sendError(ErrorMessage.badRequest.message, err));
    }
});