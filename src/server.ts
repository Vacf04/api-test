import App from "./app.js";

const port = 3001;
App.listen(port, () => {
  console.log("");
  console.log(`Escutando na porta ${port}`);
  console.log(`CTRL + Clique em http://localhost:${port}`);
});
