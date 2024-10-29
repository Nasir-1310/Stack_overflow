const express=require('express')
const router=express.Router()
const Notification=require('../models/Notification')
const authmiddleware=require('../middleware/authMiddleware')

router.get('/notification',authmiddleware, async (req,res)=>{
  const notification=  await Notification.find();
if(notification){
  res.status(200).json(notification)
  console.log(notification)
}
  else{
    res.status(404).json({message:'No notification found'})
    console.log(error)
  }

})
module.exports=router