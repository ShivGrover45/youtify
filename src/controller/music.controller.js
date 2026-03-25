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

const getAllMusics=async(req,res)=>{
    const musics=await musicModel.find().populate("artist","username")
    res.status(200).json({
        message:"Music Fetched Successfully",
        musics
    })
}

const getAlbums=async(req,res)=>{
    const albums=await albumModel.find().populate("artist")
    res.status(200).json({
        message:"Album Fetched Successfully",
        albums
    })
}

const streamMusic=async(req,res)=>{
    try{
        const trackId=req.params.id
       const track=await musicModel.findById(trackId)
       res.redirect(track.uri)
    }catch(err){
        return res.status(404).json({
            message:"Track not found"
        })
    }
}

module.exports={postMusic,createAlbum,getAllMusics,getAlbums,streamMusic}