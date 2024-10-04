import { API_KEY, TIMEOUT_SEC } from './config.js';
export const timeOut = async function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async function (URL) {
  try {
    const res = await Promise.race([fetch(URL), timeOut(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (URL, data) {
  try {
    const res = await fetch(`${URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responsedData = await res.json();
    if (!res.ok) throw new Error(`${responsedData.message} (${res.status})`);
    return responsedData;
  } catch (err) {
    throw err;
  }
};
