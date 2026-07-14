const mediaModel = require('../models/media.model');
const cloudinary = require('../config/cloudinary');
const { ok, created, noContent, fail } = require('../utils/response');

async function uploadMedia(req, res, next) {
  try {
    const { roomId } = req.body;
    if (!req.files || req.files.length === 0) {
      return fail(res, 400, 'Chưa chọn file để upload');
    }

    const existingCount = await mediaModel.countByRoom(roomId);

    const results = [];
    for (const [index, file] of req.files.entries()) {
      const isVideo = file.mimetype.startsWith('video');
      const media = await mediaModel.create({
        roomId,
        url: file.path, // multer-storage-cloudinary trả URL ở đây
        publicId: file.filename, // và public_id ở đây
        type: isVideo ? 'VIDEO' : 'IMAGE',
        // Giữ đúng thứ tự file trong 1 lần upload (kể cả khi đã có ảnh từ trước)
        order: existingCount + index,
      });
      results.push(media);
    }

    created(res, results);
  } catch (err) {
    next(err);
  }
}

async function getMediaByRoom(req, res, next) {
  try {
    const media = await mediaModel.findByRoom(req.params.roomId);
    ok(res, media);
  } catch (err) {
    next(err);
  }
}

async function deleteMedia(req, res, next) {
  try {
    const media = await mediaModel.findById(req.params.id);
    if (!media) {
      return fail(res, 404, 'Media not found');
    }

    // Xóa file thật trên Cloudinary trước
    await cloudinary.uploader.destroy(media.publicId, {
      resource_type: media.type === 'VIDEO' ? 'video' : 'image',
    });

    // Rồi mới xóa record trong DB
    await mediaModel.remove(req.params.id);

    noContent(res);
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadMedia, getMediaByRoom, deleteMedia };