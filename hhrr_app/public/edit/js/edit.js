/* eslint-disable linebreak-style */
const idCandidato = parseIDFromURL();
const form = document.querySelector('form');

function fillFormWithCandidato(candidato) {
  document.querySelector('#cedula').value = candidato.cedula;
  document.querySelector('#nombres').value = candidato.nombres;
  document.querySelector('#apellidos').value = candidato.apellidos;
  document.querySelector('#dob').value = candidato.dob;
  document.querySelector('#job_actual').value = candidato.job_actual;
  document.querySelector('#salary_exp').value = candidato.exp_salario;
}

getCandidato(idCandidato).then(fillFormWithCandidato);
