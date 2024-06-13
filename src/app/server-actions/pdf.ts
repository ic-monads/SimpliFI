"use server";

export async function parseAgreement(fileUrl: string) {
  const response = await fetch("/api/agreement/parse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileUrl }),
  });

  return response.json();
}
