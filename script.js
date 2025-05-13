async function analyzeMood() {
  const userInput = document.getElementById('userInput').value;
  const responseDiv = document.getElementById('response');

  if (!userInput.trim()) {
    responseDiv.innerHTML = "Please write something.";
    return;
  }

  responseDiv.innerHTML = "Analyzing...";

  const prompt = `The following is a person's message. Provide a supportive analysis of their mood and mental state. Be empathetic, and offer a simple, positive reflection or suggestion.\n\nMessage: "${userInput}"`;

  try {
    const res = await fetch("/.netlify/functions/chatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();

    if (data.error) {
      responseDiv.innerHTML = `API Error: ${data.error}`;
      return;
    }

    responseDiv.innerHTML = data.reply;
  } catch (err) {
    console.error("Fetch failed:", err);
    responseDiv.innerHTML = "Something went wrong. Please try again later.";
  }
}
