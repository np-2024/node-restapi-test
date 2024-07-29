const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs")

const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended: false}))

app.listen(PORT, () => console.log(`Server Started at Port ${PORT}`));

app.get("/users", (_req, res) => {
  const html = `<ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
  res.send(html);
});

app.get("/api/users", (_req, res) => {
  res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success", id: users.length });
  });
});
