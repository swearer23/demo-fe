const API_URL = 'http://localhost:5000';

const headers = new Headers();
headers.append('Access-Control-Allow-Origin', '*');
headers.append('Content-Type', 'application/json');

export const uploadPOFile = async (file: File, templateName: string) => {
  const headers = new Headers();
  headers.append('Access-Control-Allow-Origin', '*');
  const formData = new FormData();
  formData.append('file', file);
  formData.append('templateName', templateName);
  const response = await fetch(`${API_URL}/uploadPOFile`, {
    method: 'POST',
    headers,
    body: formData,
  });
  const data = await response.json();
  return data;
}

export const linearOptimization = async (args: object) => {
  const response = await fetch(`${API_URL}/optimize`, {
    method: 'POST',
    headers,
    body: JSON.stringify(args),
  });
  if (response.status == 404) {
    return {
      error: 'No solution found'
    }
  } else {
    const data = await response.json();
    return data;
  }
}