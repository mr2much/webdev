/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
const express = require('express');

// const queries = require('../../db/queries');

const Datastore = require('nedb');
// const monk = require('monk');
// const Joi = require('@hapi/joi');

// const db = monk(process.env.MONGO_URI);
// const candidatos = db.get('candidatos');
const db = new Datastore(process.env.NEDB_URI);
const candidatos = db.loadDatabase();

// const schema = Joi.object({
//   cedula: Joi.string().trim().required(),
//   nombre: Joi.string().trim().required(),
//   apellidos: Joi.string().trim().required(),
//   dob: Joi.date().required(),
//   job_actual: Joi.string().trim(),
//   exp_salario: Joi.number().integer(),
// });

const router = express.Router();

// Lee todos los candidatos
router.get('/', async (req, res, next) => {
  // queries.getAll().then((data) => {
  //   res.json(data);
  // });

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
  const { id } = req.params;

  await db.findOne({ _id: id }, (err, data) => {
    if (err) {
      next(err);
      return;
    }

    if (data) {
      res.json(data);
    } else {
      next();
    }
  });

  // try {
  //   const { id } = req.params;

  //   const item = await candidatos.findOne({ _id: id });

  //   if (!item) {
  //     next();
  //   }

  //   return res.json(item);
  // } catch (error) {
  //   next(error);
  // }
});

function validCandidato(candidato) {
  return (
    typeof candidato.nombres === 'string' &&
    typeof candidato.apellidos === 'string' &&
    typeof candidato.cedula === 'string' &&
    candidato.cedula.length === 13 &&
    candidato.cedula.match('^[0-9]{3}-?[0-9]{7}-?[0-9]{1}$') !== null &&
    typeof candidato.dob === 'string' &&
    candidato.dob.match('^[0-9]{4}-?[0-9]{2}-?[0-9]{2}$')
  );
}

// Middleware that sends the appropriate response if the Candidato is valid
function candidatoValidator(req, res, next) {
  if (validCandidato(req.body)) {
    next();
  } else {
    const error = new Error(`Candidato invalido! ${JSON.stringify(candidato)}`);
    next(error);
  }
}

function getCandidatoFromBody(body) {
  const { cedula, nombres, apellidos, dob, job_actual, exp_salario } = body;

  const candidato = {
    cedula,
    nombres,
    apellidos,
    dob,
    job_actual,
    exp_salario,
  };

  return candidato;
}

// Crear un candidato
router.post('/', candidatoValidator, (req, res, next) => {
  const candidato = getCandidatoFromBody(req.body);

  db.insert(candidato);

  // After inserting, tries to get the newly created Candidato
  db.findOne({ cedula: candidato.cedula }, (err, data) => {
    if (err) {
      next(err);
      return;
    }

    if (data) {
      res.json(data);
    } else {
      // if we were unable to retrieve the new Candidato, an error ocurred
      const error = new Error(`Error when inserting candidato: ${candidato}`);
      next(error);
    }
  });

  // const form = new multiparty.Form();
  // form.on('error', next);

  // form.parse(req, (err, fields) => {
  //   if (err) {
  //     next(err);
  //   }

  //   // validate received info
  //   if (validCandidato(fields)) {
  //     const { nombres, apellidos, cedula, dob, job_actual, exp_salario } =
  //       fields;
  //     const newCandidato = {
  //       cedula,
  //       nombres,
  //       apellidos,
  //       dob,
  //       job_actual,
  //       exp_salario,
  //     };

  //     db.insert(newCandidato);
  //     res.json(newCandidato);
  //   } else {
  //     const error = new Error(`Candidato invalido! ${JSON.stringify(fields)}`);
  //     next(error);
  //   }
  // });

  // try {
  //   console.log(req.body);
  //   const value = await schema.validateAsync(req.body);
  //   const inserted = await candidatos.insert(value);
  //   res.json(inserted);
  // } catch (error) {
  //   next(error);
  // }
});

// Actualizar un candidato
router.put('/:id', candidatoValidator, (req, res, next) => {
  const replaceCandidato = getCandidatoFromBody(req.body);

  db.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      next(err);
    }

    if (data) {
      // do something
      res.json({
        message: `Record found: ${JSON.stringify(data)}`,
      });
      //res.json(replaceCandidato);
    } else {
      const error = new Error(`Error with Candidato: ${data}`);
      next(error);
    }
  });
  // try {
  //   console.log(req.body);
  //   const { id } = req.params;
  //   const item = await candidatos.findOne({ _id: id });
  //   if (!item) {
  //     next();
  //   }
  //   const value = await schema.validateAsync(req.body);
  //   await candidatos.update(
  //     { _id: id },
  //     {
  //       $set: value,
  //     }
  //   );
  //   res.json(value);
  // } catch (error) {
  //   next(error);
  // }
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
