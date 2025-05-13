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
