/* eslint-disable linebreak-style */

const API_URL = 'http://localhost:5000/api/v1/candidatos';

function parseIDFromURL() {
  const parts = window.location.search.match(/\?id\=(.*)/);
  return parts[1].trim();
}
