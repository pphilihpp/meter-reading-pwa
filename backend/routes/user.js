const express       = require('express');
const router        = express();
const bodyParser    = require('body-parser');
const axios         = require('axios');
const cors          = require('cors');

//Dotenv -> .env Files
require('dotenv').config({ path: './vars/.env' });

router.use(cors());
//Variables
//User - Authenitcation
const user = process.env.API_USERNAME;
const pass = process.env.API_PASSWORD;


const auth = Buffer.from(`${user}:${pass}`, 'utf8').toString('base64');
let cookieToken = '';


//Body Parser
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


/*
*********************************
POST Requests to API
*********************************
Login - Auth*/
router.post('/login', async (req, res) => {

  const userData = {
      username: req.body.username,
      password: req.body.password
  }

  await axios({
    method: 'POST',
    withCredentials: true,
    url: process.env.API_URL + '/app/session',
    headers: {  'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' },
    data: userData
  })
  .then(resp => {
    cookieToken = resp.headers['set-cookie'];
    res.json({
      data: resp.data,
      cookie: cookieToken
        });

  })
  .catch(err => {
    console.log('Error: Status ' + err);
  });

});


//Meter-Reading Write Request
/*
router.post('/meter-reading/contract-accounts/:contract', async (req, res) => {
  await axios({
    method: 'POST',
    withCredentials: true,
    url: process.env.API_URL + '/app/meter-reading/contract-accounts/' + req.params.contract,
    headers: { 'Cookie': cookieToken, 'Authorization': `Basic ${auth}` }
  })
});
*/
/*
*********************************
GET Requests to API
*********************************
Meter-Reading Data for all Contracts
Example: http://localhost:3000/meter-reading*/
router.get('/meter-reading', async (req, res) => {
await axios({
    method: 'GET',
    withCredentials: true,
    url: process.env.API_URL + '/app/meter-reading',
    headers: { 'Cookie': cookieToken, 'Authorization': `Basic ${auth}` }
  })
  .then(resp => {
    res.send(resp.data);
  })
  .catch(err => {
    console.log('Error: Status ' + err);
  });

});

//Meter-Reading Data for one Contract
//Example: http://localhost:3000/meter-reading/contract-accounts/000800005001
router.get('/meter-reading/contract-accounts/:contract', async (req, res) => {
  await axios({
    method: 'GET',
    withCredentials: true,
    url: process.env.API_URL + '/app/meter-reading/contract-accounts/' + req.params.contract,
    headers: { 'Cookie': cookieToken, 'Authorization': `Basic ${auth}` }
  })
  .then(resp => {
    res.send(resp.data);
  })
  .catch(err => {
    console.log('Error: Status ' + err.response.status);
  });
});

/*
*********************************
DELETE Requests to API
*********************************
Logout
Example: http://localhost:3000/logout */
router.get('/logout', async (req, res) => {
  await axios({ 
    method: 'DELETE',
    withCredentials: true,
    url: process.env.API_URL + '/app/session',
    headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json', 'Cookie': cookieToken, 'X-Token': '' },
    data: '' 
  })
  .then(resp =>{ 
    res.send('Logout erfolgreich' );
    console.log('Logout erfolgreich');
    console.log('Status: ' + resp.status);
  })
  .catch(err => console.log('Error: Status ' + err.response.status));
});

module.exports = router;