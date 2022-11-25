const cloudinary = require('cloudinary').v2

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env

cloudinary.config({
	cloud_name: CLOUDINARY_NAME,
	api_key: CLOUDINARY_KEY,
	api_secret: CLOUDINARY_SECRET
});

const uploadImage = async (filePath) => {
	return await cloudinary.uploader.upload(filePath, {
		folder: "PF-Henry"
	})
}

const deleteImage = async (id) => {
	return await cloudinary.uploader.destroy(id)
}

module.exports = { uploadImage, deleteImage }