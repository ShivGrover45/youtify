const musicModel=require('../models/music.model')
const jwt=require('jsonwebtoken')
const {uploadFile}=require('../services/storage.service')
const albumModel = require('../models/album.model')
const postMusic=async(req,res)=>{
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"unauthorized"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
        if(decoded.role!='artist'){
            return res.status(403).json({
                message:"Forbidden"
            })
        }
    
    const {title}=req.body
    const file=req.file
    console.log(file)
    const result= await uploadFile(file.buffer.toString('base64'))
    console.log(result)
    const music=await musicModel.create({
        uri:result.url,
        title,
        artist:decoded.id
    })
    res.status(201).json({
        message:"music created succesfully",
        music
    })
}
    catch(err){
        console.log(err)
        return res.status(401).json({
           err
        })
    }
}

const createAlbum=async(req,res)=>{
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
        if(decoded.role!=="artist"){
            return res.status(403).json({
                message:"User is forbidden to access"
            })
        }
        const {title,musicId}=req.body
        const album=await albumModel.create({
            title:title,
            musics:musicId,
            artist:decoded.id
        })
        res.status(201).json({
            album
        })
    }catch(err){
        console.log(err)
        return res.status(403).json({
            message:"Forbidden Access"
        })
    }
}

module.exports={postMusic,createAlbum}