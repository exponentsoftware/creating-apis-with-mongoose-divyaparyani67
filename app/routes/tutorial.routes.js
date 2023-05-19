module.exports = (app) => {
  const tutorials = require("../controllers/tutorial.controller");

  const router = require("express").Router();

  //create a new tutorial
  router.post("/", tutorials.create);

  //get all tutorials
  router.get("/", tutorials.findAll);

  //get all tutorials by page
  router.get("/", tutorials.findAllByPage);

  //get all published tutorials
  router.get("/published", tutorials.findAllPublished);

  //get all publushed tutorials by page
  router.get("/publishedpage", tutorials.findAllPublishedByPage);

  //find tutorial by id
  router.get("/:id", tutorials.findOne);

  //update a tutorial with id
  router.put("/:id", tutorials.update);

  //delete a tutorial with id
  router.delete("/:id", tutorials.delete);

  //delete all tutorials
  router.delete("/:id", tutorials.deleteAll);

  app.use("/api/tutorials", router);
};
