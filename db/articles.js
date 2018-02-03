//db/articles.js file
let articles = [];

module.exports = {
  getAll: getAll,
  newArt: newArt,
  artPut: artPut
};

function getAll() {
  return articles;
}
function newArt(data) {
  console.log(data);
  let artObj = {
    title: data.title,
    body: data.body,
    author: data.author,
    urlTitle: encodeURI(data.urlTitle)
  };
  // artObj.title = data.title,
  // artObj.body = data.body,
  // artObj.author = data.author,
  // artObj.urlTitle = encodeURI(data.urlTitle)
  // console.log(artObj)

  articles.push(artObj);

  console.log(articles);
}

function artPut(title) {
  articles
    .filter(element => {
      if (element.title === title) {
        return element;
      } else {
        return false;
      }
    })
    .map(element => {
      (element.title = data.title),
        (element.body = data.body),
        (element.author = data.author);
      return element;
    });
}
