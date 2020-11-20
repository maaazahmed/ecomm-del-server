const { cloudinary } = require("../../cloudinary");
const express = require("express")
const router = express.Router()

router.get('/api/images', async (req, res) => {
    const { resources } = await cloudinary.search
        .expression('folder:e_com')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
});


router.post('/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'e_com',
        })
        console.log(uploadResponse);
        res.json({ msg: 'yaya', url:uploadResponse.url });
    } catch (err) {

        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});


module.exports = router


