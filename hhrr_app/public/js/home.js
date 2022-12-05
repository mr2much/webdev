/* eslint-disable linebreak-style */

const LOCAL_STORAGE_KEY = 'hhrr_app';

/* eslint-disable no-restricted-syntax */
const styleSheetLink = document.querySelector('#theme-style-link');
const lightMode = document.querySelector('#light');
const darkMode = document.querySelector('#dark');
// darkMode.style.display = 'none';
const storedTheme = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
const toggleMode = document.querySelector('#btn-check-outlined');

let isDark = storedTheme && storedTheme.isDark;

console.log(isDark);

if (isDark) {
  activateLightTheme();
} else {
  activateDarkTheme();
}

function activateLightTheme() {
  styleSheetLink.setAttribute('href', lightThemePath);
  darkMode.style.display = '';
  lightMode.style.display = 'none';
}

function activateDarkTheme() {
  styleSheetLink.setAttribute('href', darkThemePath);
  lightMode.style.display = '';
  darkMode.style.display = 'none';
}

function setTheme() {
  isDark = !isDark;
  if (isDark) {
    activateLightTheme();
  } else {
    activateDarkTheme();
  }

  const themeValue = { isDark };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(themeValue));
}

toggleMode.addEventListener('click', (e) => {
  setTheme();
});

const tableCandidatos = document.querySelector('table tbody');

async function loadEntries() {
  const res = await fetch(API_URL);
  return res.json();
}

function showCandidatos(listaCandidatos) {
  let rowCount = 0;
  listaCandidatos.forEach((candidato) => {
    const newRowCandidato = document.createElement('tr');
    tableCandidatos.appendChild(newRowCandidato);

    newRowCandidato.outerHTML = `<tr">
    <th scope="row">${++rowCount}</th>
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
      ${fixDateFormat(candidato.dob, '-')}
    </td>
    <td>
      ${candidato.job_actual}
    </td>
    <td>
      ${candidato.exp_salario}
    </td>
    <td>
      <div>      
        <a style="color: inherit;" href="/candidato.html?id=${
          candidato._id
        }"><i class="fas fa-eye"></i></a>        
      </div>
    </td>
  </tr>`;
  });
}

loadEntries().then(showCandidatos);
