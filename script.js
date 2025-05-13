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
        model: "gpt-4.1-2025-04-14",
        messages: [
          { role: "system", content: "You are a compassionate mental wellness assistant." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      })
    });

    const data = await res.json();
    console.log(data); // 👈 Check for error info

    if (data.error) {
      responseDiv.innerHTML = `API Error: ${data.error.message}`;
      return;
    }

    if (!data.choices || !data.choices[0]) {
      responseDiv.innerHTML = "No response from the AI.";
      return;
    }

    responseDiv.innerHTML = data.choices[0].message.content;
  } catch (err) {
    console.error(err);
    responseDiv.innerHTML = "Something went wrong. Check the console for details.";
  }
}

       
