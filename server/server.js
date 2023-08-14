const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();
console.log(process.env.OPENAI_API_KEY)
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("hello coder  ");
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.status(200).send({
        bot:response.data.choices[0].text

    })
  } catch (error) {
    console.log(error)

  }
});
app.listen(5000, ()=> console.log("server is running on the post 5000"))