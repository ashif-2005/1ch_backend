const { getContactsbyAgent,updateStatus} = require('../controllers/contactController');
const getUser = require('../middlewares/auth')
const routes = require('express').Router();

routes.get('/contacts',getUser,getContactsbyAgent)
routes.patch('/updateStatus',getUser,updateStatus)

module.exports = routes