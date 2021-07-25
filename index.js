const express = require('express');
const { join } = require("path");
const app = express();
const { Random } = require("something-random-on-discord");
const { NekoBot } = require("nekobot-api");
const api = new NekoBot(); 

const srod = require("something-random-on-discord").ServerAssistant;
const Database = require("@replit/database");
const db = new Database();

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, ".", "apis.json"));
});

app.get("/joke", async(req, res) => {
  let data = await Random.getJoke();
  res.json({ message: data.embed.title + "  " + data.embed.description, success: true });
});

app.get("/clyde", async(req, res) => {
  const text = req.query.text;
  const image = await api.generate("clyde", { text: text })
  res.json({ message: image, success: true })
});

app.get("/baguette", async(req, res) =>{
  const url = req.query.url;
  const image = await api.generate("baguette", { url: url })
  res.json({ message: image, success: true })
});

app.get("/advice", async(req, res) => {
  let data = await Random.getAdvice()
  res.json({ message: data.embed.description, success: true })
});



app.get("/invite", (req, res) => {
  let id = req.query.id || 811150527051464706;
  let perms = req.query.perms || 8;
  res.redirect(`https://discord.com/oauth2/authorize?client_id=${id}&permissions=${perms}&scope=bot`);
});

app.listen(3000, async () => {
  console.log('server started');
  const image = await api.generate("baguette", { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz8TueHUgVNroUgCgN5d35oo5Kg_LuFN6CHToIXL4pPSK-AL8FXgjEyBUcJlg97sMcrqg&usqp=CAU" }); console.log(image);
});