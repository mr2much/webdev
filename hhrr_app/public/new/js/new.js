/* eslint-disable linebreak-style */
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

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

  const newCandidato = {
    cedula,
    nombres,
    apellidos,
    dob,
    job_actual: formData.get('job_actual'),
    exp_salario: formData.get('exp_salario'),
  };

  createNewCandidato(newCandidato).then((result) => {
    window.location = `/candidato.html?id=${result._id}`;
  });
});

async function createNewCandidato(candidato) {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(candidato),
  };
  const res = await fetch(`${API_URL}/`, options);

  return res.json();
}

// function validCandidato(candidato) {
//   return (
//     typeof candidato.nombres[0] === 'string' &&
//     typeof candidato.apellidos[0] === 'string' &&
//     typeof candidato.cedula[0] === 'string' &&
//     candidato.cedula[0].length === 13 &&
//     candidato.cedula[0].match('^[0-9]{3}-?[0-9]{7}-?[0-9]{1}$') !== null &&
//     typeof candidato.dob[0] === 'string' &&
//     candidato.dob[0].match('^[0-9]{4}-?[0-9]{2}-?[0-9]{2}$')
//   );
// }
