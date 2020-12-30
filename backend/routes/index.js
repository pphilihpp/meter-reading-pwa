const express   = require('express');
const router    = express.Router();


//HOME
router.get('/', (req, res) => {
    res.json({ data: 'Main Page!' });
})

module.exports = router;