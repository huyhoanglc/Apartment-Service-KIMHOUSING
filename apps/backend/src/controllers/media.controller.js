const mediaModel = require('../models/media.model');
const cloudinary = require('../config/cloudinary');

async function uploadMedia(req, res, next) {
  try {
    const { roomId } = req.body;
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Chưa chọn file để upload' });
    }

    const results = [];
    for (const file of req.files) {
      const isVideo = file.mimetype.startsWith('video');
      const media = await mediaModel.create({
        roomId,
        url: file.path, // multer-storage-cloudinary trả URL ở đây
        publicId: file.filename, // và public_id ở đây
        type: isVideo ? 'VIDEO' : 'IMAGE',
      });
      results.push(media);
    }

    res.status(201).json(results);
  } catch (err) {
    next(err);
  }
}

async function getMediaByRoom(req, res, next) {
  try {
    const media = await mediaModel.findByRoom(req.params.roomId);
    res.json(media);
  } catch (err) {
    next(err);
  }
}

async function deleteMedia(req, res, next) {
  try {
    const media = await mediaModel.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // Xóa file thật trên Cloudinary trước
    await cloudinary.uploader.destroy(media.publicId, {
      resource_type: media.type === 'VIDEO' ? 'video' : 'image',
    });

    // Rồi mới xóa record trong DB
    await mediaModel.remove(req.params.id);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadMedia, getMediaByRoom, deleteMedia };