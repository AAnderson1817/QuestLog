import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';
import Account from '../model/account';

import { generateAccessToken, respond, authenticate } from '../middleware/authMiddleware';

export default ({ config, db}) => {
  let api = Router();

  // '/v1/account'
  //Create account

  api.post('/register', (req,res) => {
    Account.register(new Account({
      username: req.body.email
    }), req.body.password, function(err, account) {
      if(err){
        res.send(err);
      }

      passport.authenticate('local', {session: false})(req, res, () => {
        res.status(200).send('Successfully created account.');
      });
    });
  });

  // '/v1/account/login'
  // Log-in to account

  api.post('/login', passport.authenticate(
    'local', {
      session: false,
      scope:[]
    }), generateAccessToken, respond);

  // '/v1/account/logout'
  // Log-out of account

  api.get('/logout', authenticate, (req,res) => {
    res.logout();
    res.status(200).send('Successfully logged out');
  });

  api.get('/me', authenticate, (req, res) =>{
    res.status(200).json(req.user);
  });

  return api;
}
