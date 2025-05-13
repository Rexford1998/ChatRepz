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
        "Authorization": "Bearer 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”
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
