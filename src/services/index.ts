const API_URL = 'http://localhost:5000';

const headers = new Headers();
headers.append('Access-Control-Allow-Origin', '*');

export const uploadPOFile = async (file: File, templateName: string) => {
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