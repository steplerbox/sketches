const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Sketches API')
})

module.exports = router
