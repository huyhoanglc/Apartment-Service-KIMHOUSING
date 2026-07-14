const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');
const prisma = require('./prisma');
const { resolveFolderPathSegments, buildCloudinaryFolder } = require('../utils/folderPath.util');

// Nhớ theo req để 1 request nhiều file chỉ cần 1 lượt truy vấn Room.
// LƯU Ý: dựa vào req.body.roomId có sẵn tại thời điểm này, nghĩa là multipart form-data
// của frontend PHẢI append "roomId" TRƯỚC "files" (đã verify đúng ở cả 3 nơi gọi upload
// trong admin-dashboard hiện tại) — đừng đổi thứ tự append ở frontend nếu không xem lại chỗ này.
async function resolveRoomFolder(req) {
  if (!req._roomFolderPromise) {
    req._roomFolderPromise = (async () => {
      const roomId = req.body?.roomId;
      if (!roomId) {
        const err = new Error('Thiếu roomId để xác định thư mục upload');
        err.status = 400;
        throw err;
      }
      const room = await prisma.room.findUnique({ where: { id: roomId }, include: { apartment: true } });
      if (!room) {
        const err = new Error('Room không tồn tại');
        err.status = 404;
        throw err;
      }
      const segments = resolveFolderPathSegments({
        district: room.apartment.district,
        apartmentCode: room.apartment.apartmentCode,
        houseNumber: room.apartment.houseNumber,
        street: room.apartment.street,
        roomCode: room.code,
      });
      return { segments, cloudinaryFolder: buildCloudinaryFolder(segments), room };
    })();
  }
  return req._roomFolderPromise;
}

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith('video');
    const { cloudinaryFolder } = await resolveRoomFolder(req);
    return {
      folder: cloudinaryFolder,
      resource_type: isVideo ? 'video' : 'image',
      allowed_formats: isVideo
        ? ['mp4', 'mov', 'avi']
        : ['jpg', 'jpeg', 'png', 'webp'],
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // giới hạn 50MB/file
});

module.exports = upload;
