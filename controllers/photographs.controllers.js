const catchAsync = require('../utils/catchAsync');
const Photographs = require('../models/photographs.model');
const PhotographsImg = require('../models/photographsImg.model');
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
  const frontPageFilename = frontPageFile.filename;

  const photographs = await Photographs.create({
    title,
    titleEng,
    date,
    dateEng,
    galleryStyle,
    photographsFrontPage: `${req.protocol}://${req.get(
      'host'
    )}/api/v1/images/${frontPageFilename}`,
  });

  const promesasFotosPromised = req.files['photographsImgUrl'].map(
    async (archivo) => {
      const imgFilename = archivo.filename;

      return PhotographsImg.create({
        photographsId: photographs.id,
        photographsImgUrl: `${req.protocol}://${req.get(
          'host'
        )}/api/v1/images/${imgFilename}`,
      });
    }
  ); // Cierre del map aquí

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
