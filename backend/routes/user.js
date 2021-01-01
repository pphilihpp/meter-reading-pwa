const express       = require('express');
const router        = express();
const bodyParser    = require('body-parser');
const axios         = require('axios');

//Dotenv -> .env Files
require('dotenv').config({ path: './vars/.env' });


//Variables
//User - Authenitcation
const user = process.env.API_USERNAME;
const pass = process.env.API_PASSWORD;
const auth = Buffer.from(`${user}:${pass}`, 'utf8').toString('base64');
let cookieData = '';


//Body Parser
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())



//Login Route
router.post('/login', async (req, res, next) => {
  const userData = {
      username: req.body.username,
      password: req.body.password
  }

  const response = await axios({
    method: 'POST',
    withCredentials: true,
    url: process.env.API_URL + '/app/session',
    headers: {  'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' },
    data: userData
  })
  .catch(err => {
    console.log(err);
  });

  try {
    console.log(response.headers);
    console.log(response.headers['x-token']);
    cookieData = response.headers['set-cookie'];
  } catch(err) {
    console.log('Error: ' + err);
  }

});


//GET Request - Contract Overview
router.get('/contracts', async (req, res) => {
  const response = await axios({
    method: 'GET',
    withCredentials: true,
    url: process.env.API_URL + '/app/meter-reading',
    headers: { 'Cookie': cookieData, 'Authorization': `Basic ${auth}` }
  })
  //.then(resp => console.log(resp.data));

  res.send(response.data);
});

module.exports = router;