const musicModel=require('../models/music.model')
const jwt=require('jsonwebtoken')
const {uploadFile}=require('../services/storage.service')
const postMusic=async(req,res)=>{
    const {title}=req.body
    const file=req.file
    const result=await uploadFile(file.buffer.toString('base64'))
    const music=await musicModel.create({
        uri:result.url,
        title:title,
        artist:"ShivGrover"
    })
    res.status(201).json({
        message:"music created succesfully",
        music
    })
}

module.exports=postMusic