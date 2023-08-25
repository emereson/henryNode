const catchAsync = require('../utils/catchAsync');
const Photographs = require('../models/photographs.model');
const PhotographsImg = require('../models/photographsImg.model');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { storage } = require('../utils/firebase');
const DataPhotographs = require('../models/dataPhotographs.model');

exports.findAll = catchAsync(async (req, res, next) => {
  const photographs = await Photographs.findAll({
    where: {
      status: 'active',
    },
    include: [
      {
        model: PhotographsImg,
      },
      { model: DataPhotographs },
    ],
  });
  return res.status(200).json({
    status: 'success',
    results: photographs.length,
    photographs,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { photographs } = req;

  return res.status(200).json({
    status: 'success',
    photographs,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { title, date, titleEng, dateEng, galleryStyle } = req.body;

  const frontPageFile = req.files['photographsFrontPage'][0];

  const frontPageRef = ref(
    storage,
    `photographsFrontPage/${Date.now()}-${frontPageFile.originalname}`
  );

  await uploadBytes(frontPageRef, frontPageFile.buffer);

  const frontPageUrl = await getDownloadURL(frontPageRef);

  const photographs = await Photographs.create({
    title,
    titleEng,
    date,
    dateEng,
    galleryStyle,
    photographsFrontPage: frontPageUrl,
  });

  const promesasFotosPromised = req.files['photographsImgUrl'].map(
    async (archivo) => {
      const imgRef = ref(
        storage,
        `photographsImgUrl/${Date.now()}-${archivo.originalname}`
      );

      await uploadBytes(imgRef, archivo.buffer);

      const imgUrl = await getDownloadURL(imgRef);

      return PhotographsImg.create({
        photographsId: photographs.id,
        photographsImgUrl: imgUrl,
      });
    }
  );

  await Promise.all(promesasFotosPromised);

  return res.status(201).json({
    estado: 'Éxito',
    mensaje: 'Fotos creadas exitosamente',
    photographs,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { photographs } = req;
  const { title, titleEng, date, dateEng, galleryStyle } = req.body;
  await photographs.update({ title, titleEng, date, dateEng, galleryStyle });

  return res.status(201).json({
    status: 'Success',
    message: 'photographs update successfully',
    photographs,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { photographs } = req;

  await photographs.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'photographs has been delete',
    photographs,
  });
});
