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
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a compassionate mental wellness assistant." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      })
    });

    const data = await res.json();
    responseDiv.innerHTML = data.choices[0].message.content;
  } catch (err) {
    console.error(err);
    responseDiv.innerHTML = "Something went wrong. Please try again later.";
  }
}
