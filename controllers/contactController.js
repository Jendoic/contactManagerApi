const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')


const getAllContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id})
    res.status(200).json({ success: true, contacts })
})

const getContact = asyncHandler(async (req, res) => {
     const contact = await Contact.findById(req.params.id)
     if(!contact){
         res.status(404)
         throw new Error('Contact not found')
     }
    res.status(200).json({success:true, contact})
})

const createContact = asyncHandler(async (req, res) => {
    console.log(req.body)
    const {name, email, phone} = req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error('All fields are mandatory')
    }
    const contact = await Contact.create({name, email, phone, user_id: req.user.id})
    res.status(201).json({ success: true, contact })
})

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found')
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User don't have the permission to update other user contacts")
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(200).json({success:true, message:"Contact Updated", updatedContact })
})

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found')
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("User don't have the permission to delete other user contacts")
    }
    
    await Contact.findByIdAndDelete(req.params.id)
    res.status(204).json({success:true, msg: "Contact deleted",  })
})

module.exports = {
    getAllContact,
    getContact,
    createContact,
    updateContact,
    deleteContact
}