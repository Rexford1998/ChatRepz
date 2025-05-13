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

       
