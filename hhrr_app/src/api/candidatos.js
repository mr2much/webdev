/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

// Lee todos los candidatos
router.get('/', (req, res, next) => {
  res.json({
    message: 'Hello read all!',
  });
});

// Lee un candidato
router.get('/:id', (req, res, next) => {
  res.json({
    message: 'Hello read one!',
  });
});

// Crear un candidato
router.post('/', (req, res, next) => {
  res.json({
    message: 'Hello create one!',
  });
});

// Actualizar un candidato
router.put('/:id', (req, res, next) => {
  res.json({
    message: 'Hello update one!',
  });
});

// Remover un candidato
router.delete('/:id', (req, res, next) => {
  res.json({
    message: 'Hello delete one!',
  });
});

module.exports = router;
