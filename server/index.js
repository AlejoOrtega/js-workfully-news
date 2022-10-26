const express = require("express");
const bodyParser = require("body-parser");
const dbConn = require("./config/db.config");
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// define a root route
app.get("/", (req, res) => {
  res.send("Nodejs express server working");
});
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

//Creating GET Router to fetch all the articles from the MySQL Database
app.get("/articles", (req, res) => {
  dbConn.query("SELECT * FROM articles", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Creating GET Router to fetch single articles by ID from the MySQL Database
app.get("/articles/:id", (req, res) => {
  dbConn.query(
    "SELECT * FROM articles WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Creating DELETE Router to delete single articles by ID from the MySQL Database
app.delete("/articles/:id", (req, res) => {
  dbConn.query(
    "DELETE FROM articles WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Article deleted successfully.");
      else console.log(err);
    }
  );
});

//Creating POST Router to create single article to the MySQL Database
app.post("/articles", (req, res) => {
  dbConn.query(
    "INSERT INTO articles(title, description, content, author, thumbnail) VALUES (?, ?, ?, ?, ?)",
    [
      req.body.title,
      req.body.description,
      req.body.content,
      req.body.author,
      req.body.thumbnail,
    ],
    (err, rows, fields) => {
      if (!err) res.send("Article created successfully.");
      else console.log(err);
    }
  );
});

//Creating PUT Router to update single articles by ID from the MySQL Database
app.put("/articles/:id", (req, res) => {
  dbConn.query(
    "UPDATE articles SET title=?, description=?, content=?, author=?, thumbnail=? WHERE id=?",
    [
      req.body.title,
      req.body.description,
      req.body.content,
      req.body.author,
      req.body.thumbnail,
      req.params.id,
    ],
    (err, rows, fields) => {
      if (!err) res.send("Article updated successfully.");
      else console.log(err);
    }
  );
});
