/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
const tableCandidatos = document.querySelector('table tbody');

async function loadEntries() {
  const res = await fetch(API_URL);
  return res.json();
}

function showCandidatos(listaCandidatos) {
  listaCandidatos.forEach((candidato) => {
    const newRowCandidato = document.createElement('tr');
    tableCandidatos.appendChild(newRowCandidato);

    newRowCandidato.outerHTML = `<tr">
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
        <a href="/candidato.html?id=${candidato._id}">Editar</a>
        <a href="#">Eliminar</a>
      </div>
    </td>
  </tr>`;
  });
}

loadEntries().then(showCandidatos);
