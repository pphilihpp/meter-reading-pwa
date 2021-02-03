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
let cookieToken = 'cos-token=pt2PxedD9hqYxolfqDBLnwqgbeR2TiMy_o1XBkH1upQzScPc9mHt4Z1Fxjz0_xa2mV4gl9QwCzIzm3MeCFZsEw||; Path=/portal/app; HttpOnly';
let currentData = [];

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
    res.json({
      error: err
    })
  });

});


//Meter-Reading Write Request
<<<<<<< HEAD

router.post('/meter-reading/contract-accounts/:contract', async (req, res) => {
  
=======
router.post('/meter-reading/contract-accounts/:contract', async (req, res) => {
  
  currentDataTrans = {
    number: currentData.number,
    premiseAddress: currentData.premiseAddress,
    documentDeliveryType: currentData.documentDeliveryType,
    active: currentData.active,
    postBoxUnread: currentData.postBoxUnread,
    documents: currentData.documents,
    BudgetBillingList: currentData.BudgetBillingList,
    contracts: [
      {
      number: currentData.contracts[0].number,
      description: currentData.contracts[0].description,
      division: currentData.contracts[0].division,
      actualMeter: currentData.contracts[0].actualMeter,
      meterReadingDetails: [
        {
        meter: currentData.contracts[0].meterReadingDetails[0].meter,
        equipment: currentData.contracts[0].meterReadingDetails[0].equipment,
        register: currentData.contracts[0].meterReadingDetails[0].register,
        registerKind: currentData.contracts[0].meterReadingDetails[0].registerKind,
        preDecPos: currentData.contracts[0].meterReadingDetails[0].preDecPos,
        decPos: currentData.contracts[0].meterReadingDetails[0].decPos,
        historical: currentData.contracts[0].meterReadingDetails[0].historical,
        cancelable: currentData.contracts[0].meterReadingDetails[0].cancelable,
        status: currentData.contracts[0].meterReadingDetails[0].status,
        resultOld: currentData.contracts[0].meterReadingDetails[0].resultOld,
        resultNew: {
          readingtype: currentData.contracts[0].meterReadingDetails[0].resultNew.readingtype,
          readingkind: currentData.contracts[0].meterReadingDetails[0].resultNew.readingkind,
          readingnumber: currentData.contracts[0].meterReadingDetails[0].resultNew.readingnumber,
          readingreason: currentData.contracts[0].meterReadingDetails[0].resultNew.readingreason,
          readingdateTarget: currentData.contracts[0].meterReadingDetails[0].resultNew.readingdateTarget,
          readingdateActual: currentData.contracts[0].meterReadingDetails[0].resultNew.readingdateActual,
          readingdateBilling: currentData.contracts[0].meterReadingDetails[0].resultNew.readingdateBilling,
          implausible: currentData.contracts[0].meterReadingDetails[0].resultNew.implausible,
          confirmed: currentData.contracts[0].meterReadingDetails[0].resultNew.confirmed,
          explanationHint: currentData.contracts[0].meterReadingDetails[0].resultNew.explanationHint,
          result: req.body.newResult
        },
        massRead: currentData.contracts[0].meterReadingDetails[0].massRead,
        $$hashKey: currentData.contracts[0].meterReadingDetails[0].$$hashKey
      }
    ],
    meterReadingDates: currentData.contracts[0].meterReadingDates,
    permission: currentData.contracts[0].permission,
    consumptionList: currentData.contracts[0].consumptionList,
    productText: currentData.contracts[0].productText,
    moveinDate: currentData.contracts[0].moveinDate,
    moveoutDate: currentData.contracts[0].moveoutDate,
    cancellationDate: currentData.contracts[0].cancellationDate,
    contractEndDate: currentData.contracts[0].contractEndDate,
    productData: currentData.contracts[0].productData,
    $$hashKey: currentData.contracts[0].$$hashKey

    },
    {
      number: currentData.contracts[1].number,
      description: currentData.contracts[1].description,
      division: currentData.contracts[1].division,
      actualMeter: currentData.contracts[1].actualMeter,
      meterReadingDetails: [{
        meter: currentData.contracts[1].meterReadingDetails[0].meter,
        equipment: currentData.contracts[1].meterReadingDetails[0].equipment,
        register: currentData.contracts[1].meterReadingDetails[0].register,
        registerKind: currentData.contracts[1].meterReadingDetails[0].registerKind,
        preDecPos: currentData.contracts[1].meterReadingDetails[0].preDecPos,
        decPos: currentData.contracts[1].meterReadingDetails[0].decPos,
        historical: currentData.contracts[1].meterReadingDetails[0].historical,
        cancelable: currentData.contracts[1].meterReadingDetails[0].cancelable,
        status: currentData.contracts[1].meterReadingDetails[0].status,
        resultOld: currentData.contracts[1].meterReadingDetails[0].resultOld,
        resultNew: {
          readingtype: currentData.contracts[1].meterReadingDetails[0].resultNew.readingtype,
          readingkind: currentData.contracts[1].meterReadingDetails[0].resultNew.readingkind,
          readingnumber: currentData.contracts[1].meterReadingDetails[0].resultNew.readingnumber,
          readingreason: currentData.contracts[1].meterReadingDetails[0].resultNew.readingreason,
          readingdateTarget: currentData.contracts[1].meterReadingDetails[0].resultNew.readingdateTarget,
          readingdateActual: currentData.contracts[1].meterReadingDetails[0].resultNew.readingdateActual,
          readingdateBilling: currentData.contracts[1].meterReadingDetails[0].resultNew.readingdateBilling,
          implausible: currentData.contracts[1].meterReadingDetails[0].resultNew.implausible,
          confirmed: currentData.contracts[1].meterReadingDetails[0].resultNew.confirmed,
          explanationHint: currentData.contracts[1].meterReadingDetails[0].resultNew.explanationHint,
          result: req.body.newResult
        },
        massRead: currentData.contracts[1].meterReadingDetails[0].massRead,
        $$hashKey: currentData.contracts[1].meterReadingDetails[0].$$hashKey
      }
    ],
    meterReadingDates: currentData.contracts[1].meterReadingDates,
    permission: currentData.contracts[1].permission,
    consumptionList: currentData.contracts[1].consumptionList,
    productText: currentData.contracts[1].productText,
    moveinDate: currentData.contracts[1].moveinDate,
    moveoutDate: currentData.contracts[1].moveoutDate,
    cancellationDate: currentData.contracts[1].cancellationDate,
    contractEndDate: currentData.contracts[1].contractEndDate,
    productData: currentData.contracts[1].productData,
    $$hashKey: currentData.contracts[1].$$hashKey
    }
    ],
    permission: currentData.permission
  }



>>>>>>> 3f561576b2d3d54eda6d1d0bc4ffc15a6571770d
  await axios({
    method: 'POST',
    withCredentials: true,
    url: process.env.API_URL + '/app/meter-reading/contract-accounts/' + req.params.contract,
<<<<<<< HEAD
    headers: { 'Cookie': cookieToken, 'Authorization': `Basic ${auth}` },
    data: req.body
  })
  .then(resp => {
    res.send(resp.data);
  })
  .catch(err => {
    console.log('Error: Status ' + err);
  });
  // console.log(req.params.contract);
=======
    headers: { 'Cookie': cookieToken, 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' },
    data: currentDataTrans 
  })
  .then(resp => {
    res.send(resp.data);
  });
>>>>>>> 3f561576b2d3d54eda6d1d0bc4ffc15a6571770d
});

/*
*********************************
GET Requests to API
*********************************
Meter-Reading Data for all Contracts
Example: http://localhost:9000/meter-reading*/
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
//Example: http://localhost:9000/meter-reading/contract-accounts/000800005001
router.get('/meter-reading/contract-accounts/:contract', async (req, res) => {
   await axios({
    method: 'GET',
    withCredentials: true,
    url: process.env.API_URL + '/app/meter-reading/contract-accounts/' + req.params.contract,
    headers: { 'Cookie': cookieToken, 'Authorization': `Basic ${auth}` }
   })
   .then(resp => {
     res.send(resp.data);
     currentData = resp.data;
     console.log(currentData.contracts[0].meterReadingDetails[0].status);
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
Example: http://localhost:9000/logout */
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