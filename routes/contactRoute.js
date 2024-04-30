const express = require('express')
const router = express.Router()
const validateToken = require('../middlewares/validateTokenHandler')

const {
    getAllContact,
    getContact,
    createContact,
    updateContact,
    deleteContact
}  
= require('../controllers/contactController')


router.use(validateToken)

router.route('/').get(getAllContact).post(createContact)

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)


module.exports = router