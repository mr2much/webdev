/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
const API_URL = 'http://localhost:5000/api/v1/candidatos';
const tableCandidatos = document.querySelector('table tbody');

async function loadEntries() {
  const res = await fetch(API_URL);
  return res.json();
}

function showCandidatos(listaCandidatos) {
  listaCandidatos.forEach((candidato) => {
    const newRowCandidato = document.createElement('tr');
    tableCandidatos.appendChild(newRowCandidato);

    newRowCandidato.outerHTML = `<tr id="${candidato._id}">
    <td>
      ${candidato.cedula}
    </td>
    <td>
      ${candidato.nombres}
    </td>
    <td>
      ${candidato.apellidos}
    </td>
    <td>
      ${candidato.dob}
    </td>
    <td>
      ${candidato.job_actual}
    </td>
    <td>
      ${candidato.exp_salario}
    </td>
    <td>
      <div>
        <a href="${API_URL}/index.html?id=${candidato._id}">Editar</a>
        <a href="#">Eliminar</a>
      </div>
    </td>
  </tr>`;
  });
}

loadEntries().then(showCandidatos);
