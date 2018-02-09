let express = require("express");
const knex = require("./knex/knex.js");
let app = express();

let productRoute = require("./routes/products");
let articlesRoute = require("./routes/articles");
let method_override = require("method-override");

let bodyParser = require("body-parser");
let hbs = require("express-handlebars");
const PORT = process.env.PORT || 8080;

app.engine(
  ".hbs",
  hbs({
    defaultLayout: "main",
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(method_override("_method"));
app.use("/articles", articlesRoute);
app.get("/", function(req, res) {
  res.render("./layouts/main");
});

app.listen(PORT, err => {
  if (err) {
    throw err;
  }
  console.log(`Server's up on port: ${PORT}`);
});

function createArt(articles) {
  let rawTemplate = document.getElementById("home").innerHTML;
  let compiledTemplate = Handlebars.compile(rawTemplate);
  let genHTML = compiledTemplate(articles);

  let home = document.getElementById("home");
  home.innerHTML = genHTML;
}
