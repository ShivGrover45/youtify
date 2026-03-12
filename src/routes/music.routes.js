const express=require('express')
const postMusic = require('../controller/music.controller')
const multer=require('multer')
const router=express.Router()
const upload=multer({
    storage:multer.memoryStorage()
})


router.post('/upload',upload.single('music'),postMusic)


module.exports=router