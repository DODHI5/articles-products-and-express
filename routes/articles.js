//routes/articles.js file
const express = require("express");
let router = express.Router();
const db = require("../db/articles");

//Time
router.use((req, res, next) => {
  console.log(`In user route ${Date.now()}`);
  next();
});
//

router
  .route("/")

  .get((req, res) => {
    const articlesArr = db.getAll();
    res.render("./index", {
      collection: articlesArr
    });
  })
  .post((req, res) => {
    let body = req.body;
    db.newArt(body);
    res.redirect("/articles");
  });

router.route("/:title/edit").get((req, res) => {
  let articlesArr = db.getAll();
  res.render("/articles/edit", {
    collection: articlesArr[0]
  });
  router.put("/:title", (req, res) => {
    let title = req.params.title;
    let body = req.body;
    let mickey = db.artPut(title);
    res.redirect("/articles/title");
  });
});
// router.get("/edit", (req, res) => {
//   const articlesArr = db.getAll();
//   res.render("article/edit", {
//     collection: articlesArr[0]
//

router.route("/new").get((req, res) => {
  res.render("article/new");
});

router.get("/:title", (req, res) => {
  const articlesArr = db.getAll();
  // console.log(articlesArr);
  res.render("./index", {
    collection: articlesArr
  });
});
// });

module.exports = router;
// router.delete('/:title', (req, res) => {
//   articles.delete(req.params.title);
//   return res.redirect('/articles');
// });

// router.get('/:title/edit', (req, res) => {
//   let title = req.params.title;
//   let finder = db.getAll(req.params.title);
//   return res.render('articles/edit', finder);
// })
// const data = {
//   title: body.title,
//   body: body.body,
//   author: body.author
// }
// console.log(db.newArt(req.body))
// if (db.newArt(req.body)) {
//     res.redirect('/articles')
//   } else {
//     res.redirect('/articles/new')
//   }
// .put('/:title', (req, res) => {
//   let title = req.params.title;
//   console.log(req.params.title)
//   res.render(db.artPut(title))
// })
// .delete('/:title',(req,res) => {

// })
