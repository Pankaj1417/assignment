const express = require('express')
const router = new express.Router()
const User = require('../models/user')



//creating a user
router.post('/users',async (req, res)=>{
    const user = new User(req.body)
    try{
       await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

//fetching all the users
router.get('/users',async (req,res) =>{
    try{
        const users = await User.find({})
        if(!users){
            return res.status(404).send()
        }
        res.status(200).send(users)
       
    }catch(e){
        res.status(500).send(e)
    }
})

//finding user by their id
 router.get('/users/:id',async (req,res)=>{
     const _id = req.params.id
     try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send(user)
     }catch(e){
        res.status(500).send(e)
     }
 })


 //Update user by id ---- updating password is not allowed
 router.patch('/users/:id',async (req,res)=>{

    const _id = req.params.id
    //data to be updated
    const toBeUpdated = Object.keys(req.body)
    //all allowed updates
    const allowedUpdates = ['name','userName']
    //checking for data to be updates as it is allowed or not
    const isValidUpdate = toBeUpdated.every((update)=>allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(400).send({
            Error : 'This update is invalid'
        })
    }

    try{
        const user = await User.findById(_id)
        toBeUpdated.forEach((update) => user[update] = req.body[update])
        user.save()
        res.status(200).send(user)
    }catch(e){
        res.status(400).send(e)
    }
 })





//Creating endpoint to delete user
router.delete('/users/:id',async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.status(404).send()
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send()
    }
})



module.exports = router