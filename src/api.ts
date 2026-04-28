export async function handleUpload(file: File) {
  const formData = new FormData();
  formData.append("file", file);

    const API_URL = import.meta.env.VITE_API_URL;

  const response = await fetch(`${API_URL}/chat/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const disposition = response.headers.get("content-disposition");

  let filename = "download.zip";

  if (disposition) {
  const match = disposition.match(/filename="?([^"]+)"?/);
    if (match && match[1]) {
      filename = match[1];
    }
  }

  a.download = filename;

  document.body.appendChild(a);
  a.click();

  a.remove();

  window.URL.revokeObjectURL(url);
}