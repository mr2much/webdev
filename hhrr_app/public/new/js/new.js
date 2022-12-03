/* eslint-disable linebreak-style */

const btnCancel = document.querySelector('form #cancel-btn');

btnCancel.addEventListener('click', (e) => {
  window.location = '/';
});

const form = document.querySelector('form');

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

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newCandidato = validateFormGetCandidato(form);

  if (newCandidato) {
    createNewCandidato(newCandidato).then((result) => {
      window.location = `/candidato.html?id=${result._id}`;
    });
  }
});
