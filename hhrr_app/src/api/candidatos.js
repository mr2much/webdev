/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
const express = require('express');
const Datastore = require('nedb');
const monk = require('monk');
const Joi = require('@hapi/joi');

// const db = monk(process.env.MONGO_URI);
// const candidatos = db.get('candidatos');
const db = new Datastore(process.env.NEDB_URI);
const candidatos = db.loadDatabase();

const schema = Joi.object({
  cedula: Joi.string().trim().required(),
  nombre: Joi.string().trim().required(),
  apellidos: Joi.string().trim().required(),
  dob: Joi.date().required(),
  job_actual: Joi.string().trim(),
  exp_salario: Joi.number().integer(),
});

const router = express.Router();

// Lee todos los candidatos
router.get('/', async (req, res, next) => {
  db.find({}, (err, data) => {
    if (err) {
      next(err);
      return;
    }

    res.json(data);
  });
});

// Lee un candidato
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await candidatos.findOne({ _id: id });

    if (!item) {
      next();
    }

    return res.json(item);
  } catch (error) {
    next(error);
  }
});

// Crear un candidato
router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const value = await schema.validateAsync(req.body);
    const inserted = await candidatos.insert(value);
    res.json(inserted);
  } catch (error) {
    next(error);
  }
});

// Actualizar un candidato
router.put('/:id', async (req, res, next) => {
  try {
    console.log(req.body);

    const { id } = req.params;
    const item = await candidatos.findOne({ _id: id });

    if (!item) {
      next();
    }

    const value = await schema.validateAsync(req.body);
    await candidatos.update(
      { _id: id },
      {
        $set: value,
      }
    );
    res.json(value);
  } catch (error) {
    next(error);
  }
});

// Remover un candidato
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    await candidatos.remove({ _id: id });

    res.json({
      message: 'Success',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
