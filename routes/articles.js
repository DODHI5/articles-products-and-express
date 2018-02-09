//routes/articles.js file
let express = require("express");
let router = express.Router();
let knex = require("../knex/knex.js");

//Time
router.use((req, res, next) => {
  console.log(`In user route ${Date.now()}`);
  next();
});
//
router.get("/", (req, res) => {
  knex("articles")
    .select()
    .then(result => {
      res.render("./index", {
        collection: result
      });
    });
});

router.get("/new", (req, res) => {
  knex("articles")
    .select()
    .then(result => {
      res.render("./article/new", {
        collection: result
      });
    });
});
router.get("/:title", (req, res) => {
  let title = req.params.title;
  knex("articles")
    .where({ title: title })
    .then(result => {
      res.render("./article/article", {
        collection: result[0]
      });
    });
});

router.get("/:title/:edit", (req, res) => {
  let title = req.params.title;
  knex("articles")
    .where({ title: title })
    .then(result => {
      res.render("./article/edit", {
        collection: result[0]
      });
    });
});

router.post("/", (req, res) => {
  let data = ({ title, body, author } = req.body);
  data.url_title = encodeURIComponent(title);
  if (!(title || body || author)) {
    throw new Error("Missing title, body or author");
  }
  return knex
    .insert(data)
    .into("articles")
    .returning("*")
    .then(result => {
      res.redirect("/articles");
    })

    .catch(err => {
      return res.status(500).json({ message: err.message });
    });
});

router.put("/:title/edit", (req, res) => {
  let url_title = req.params.title;
  let data = ({ title, body, author } = req.body);
  knex("articles")
    .where({
      title: url_title
    })

    .update({
      title: data.title,
      body: data.body,
      author: data.author
    })
    .then(result => {
      res.redirect("/articles");
    });
});

router.delete("/:title", (req, res) => {
  let title = req.params.title;
  knex("accounts")
    .where("title", title)
    .del()
    .then(result => {
      console.log("sjah", result);
      res.redirect("/articles");
    });
});

module.exports = router;
// router
//   .route("/")

// .get((req, res) => {
//   const articlesArr = db.getAll();
//   res.render("./index", {
//     collection: articlesArr
//   });
// })
// .post((req, res) => {
//   let body = req.body;
//   db.newArt(body);
//   res.redirect("/articles");
// });

// router.route("/:title/edit").get((req, res) => {
//   let articlesArr = db.getAll();
//   res.render("/articles/edit", {
//     collection: articlesArr[0]
//   });
//   router.put("/:title", (req, res) => {
//     let title = req.params.title;
//     let body = req.body;
//     let mickey = db.artPut(title);
//     res.redirect("/articles/title");
//   });
// });
// // router.get("/edit", (req, res) => {
// //   const articlesArr = db.getAll();
// //   res.render("article/edit", {
// //     collection: articlesArr[0]
// //

// router.route("/new").get((req, res) => {
//   res.render("article/new");
// });

// router.get("/:title", (req, res) => {
//   const articlesArr = db.getAll();
//   // console.log(articlesArr);
//   res.render("./index", {
//     collection: articlesArr
//   });
// });
// // });

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
