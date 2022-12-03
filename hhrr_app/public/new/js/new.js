/* eslint-disable linebreak-style */
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newCandidato = validateForm(form);

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
