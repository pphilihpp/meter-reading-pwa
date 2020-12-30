const express       = require('express');
const router        = express();
const bodyParser    = require('body-parser');
const fetch         = require('node-fetch');

//Dotenv -> .env Files
require('dotenv').config({ path: './vars/.env' });


//Body Parser
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

//Authentication
router.post('/login', async (req, res) => {
    const user = process.env.API_USERNAME;
    const pass = process.env.API_PASSWORD;
    const userData = {
            username: req.body.username,
            password: req.body.password
    }
    const url = process.env.API_URL + '/app/session';
    const auth = Buffer.from(`${user}:${pass}`, 'utf8').toString('base64');

    const response = await fetch(url, {
        method: 'POST',
        //credentials: 'include',
        headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json;charset=UTF-8'},
        body: JSON.stringify(userData)
      })
      .then(resp => resp.json())
      .catch(err => res.json({message: err}));
      //.catch(err => console.log(err));
    res.json(response);
    //console.log(response);
});

//Testing - GET-Data from API
router.get('/contracts', async (req, res) => {
    const url = process.env.API_URL + '/app/meter-reading';

    const auth = Buffer.from(`${user}:${pass}`, 'utf8').toString('base64');

    const user = process.env.API_USERNAME;
    const pass = process.env.API_PASSWORD;

    const response = await fetch(url, {
        method: 'GET',
        //credentials: 'include',
        headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json;charset=UTF-8' }
      })
      .then(res => res.json())
      .catch(err => res.json({ message: err }));

      //res.json(response[0]);
      console.log(response[0]);

});


module.exports = router;