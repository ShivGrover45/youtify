const express=require('express')
const musicController = require('../controller/music.controller')
const authMiddleware=require('../middleware/auth.middleware')
const multer=require('multer')

const upload=multer({
    storage:multer.memoryStorage()
})

const router=express.Router()

router.post('/upload',authMiddleware.authArtist,upload.single("music"),musicController.postMusic)
router.post('/album',authMiddleware.authArtist,musicController.createAlbum)

router.get('/',musicController.getAllMusics)

module.exports=router