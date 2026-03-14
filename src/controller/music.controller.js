const musicModel=require('../models/music.model')
const jwt=require('jsonwebtoken')
const {uploadFile}=require('../services/storage.service')
const albumModel = require('../models/album.model')
const postMusic=async(req,res)=>{    
    const {title}=req.body
    const file=req.file
    console.log(file)
    const result= await uploadFile(file.buffer.toString('base64'))
    console.log(result)
    const music=await musicModel.create({
        uri:result.url,
        title,
        artist:req.user.id
    })
    res.status(201).json({
        message:"music created succesfully",
        music
    })
}

const createAlbum=async(req,res)=>{
   
   
        const {title,musicId}=req.body
        const album=await albumModel.create({
            title:title,
            musics:musicId,
            artist:req.user.id
        })
        res.status(201).json({
            album
        })
    }


module.exports={postMusic,createAlbum}