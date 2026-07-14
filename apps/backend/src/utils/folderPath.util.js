const COMBINING_DIACRITICS = /[̀-ͯ]/g;

// Backend-side equivalent of the frontend's slugify.ts, but preserves word casing
// and joins with "_" instead of lowercasing + "-" (folder names in this spec keep
// case, e.g. "Binh_Tien", not "binh-tien").
function toFolderSegment(input) {
  return String(input || '')
    .normalize('NFD')
    .replace(COMBINING_DIACRITICS, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

const ROOT_FOLDER_NAME = 'KIM_HOUSING';
const CATEGORY_FOLDER_NAME = 'Apartments';

function buildApartmentFolderName({ apartmentCode, houseNumber, street }) {
  return `${apartmentCode}_${toFolderSegment(houseNumber)}_${toFolderSegment(street)}`;
}

// district and roomCode kept as-is (unslugified) per the confirmed example
// "KIM_HOUSING/Apartments/Quận 5/A000025_244_Binh_Tien/R101".
function resolveFolderPathSegments({ district, apartmentCode, houseNumber, street, roomCode }) {
  return {
    root: ROOT_FOLDER_NAME,
    category: CATEGORY_FOLDER_NAME,
    district,
    apartment: buildApartmentFolderName({ apartmentCode, houseNumber, street }),
    room: roomCode,
  };
}

function buildCloudinaryFolder(segments) {
  return [segments.root, segments.category, segments.district, segments.apartment, segments.room].join('/');
}

module.exports = {
  toFolderSegment,
  buildApartmentFolderName,
  resolveFolderPathSegments,
  buildCloudinaryFolder,
};
