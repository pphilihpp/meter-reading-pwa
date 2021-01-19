const express       = require('express');
const app           = express();
const cors          = require('cors');

require('dotenv').config({ path: './vars/.env' });

//allow Cors
app.use(cors());

//Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/user'));

//Express Server
app.listen(process.env.PORT, () => {
    console.log('Server started on localhost: ' + process.env.PORT);
});