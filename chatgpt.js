const fetch = require('node-fetch');

exports.handler = async function(event) {
  const { prompt } = JSON.parse(event.body);

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

  if (data.error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: data.error.message })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ reply: data.choices[0].message.content })
  };
};
