/* eslint-disable linebreak-style */

const API_URL = 'http://localhost:5000/api/v1/candidatos';

function parseIDFromURL() {
  const parts = window.location.search.match(/\?id\=(.*)/);
  return parts[1].trim();
}

function getCandidato(id) {
  return fetch(`${API_URL}/${id}`).then((res) => res.json());
}

function validateFormGetCandidato(form) {
  const formData = new FormData(form);

  const cedula = formData.get('cedula');
  const nombres = formData.get('nombres');
  const apellidos = formData.get('apellidos');
  const dob = formData.get('dob');

  // should validate that the cedula has a valid format
  if (cedula.trim() === '') {
    // show alert message when cedula is empty
    return;
  }

  if (nombres.trim() === '') {
    // show alert message when nombres is empty
    return;
  }

  if (apellidos.trim() === '') {
    // show alert message when apellidos is empty
    return;
  }

  // should validate that the dob has a valid date format
  if (dob.trim() === '') {
    // show alert message when date of birth (dob) is empty
    return;
  }

  // should also convert dob from YYYY-MM-DD to valid database date format

  const candidato = {
    cedula,
    nombres,
    apellidos,
    dob,
    job_actual: formData.get('job_actual'),
    exp_salario: formData.get('exp_salario'),
  };

  return candidato;
}
