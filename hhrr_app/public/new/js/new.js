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
