const {ImageKit}=require('@imagekit/nodejs')

const client=new ImageKit({
    privatekey:process.env.IMAGEKIT_PRIVATE_KEY
})

const uploadFile=async(file)=>{
    const result=await client.files.upload({
        file:file.buffer,
        filename:"music_"+Date.now(),
        folder:"youtify/music"
    }) 
    return result
}

module.exports={uploadFile}