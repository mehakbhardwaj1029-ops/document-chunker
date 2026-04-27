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
  a.download = "chunks.txt";

  document.body.appendChild(a);
  a.click();

  a.remove();
  window.URL.revokeObjectURL(url);
}