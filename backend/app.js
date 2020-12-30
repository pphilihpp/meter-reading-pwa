const express       = require('express');
const bodyParser    = require('body-parser');
const app           = express();


require('dotenv').config({ path: './vars/.env' });

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/user'));

//Express Server
app.listen(process.env.PORT, () => {
    console.log('Server started on localhost: ' + process.env.PORT);
});