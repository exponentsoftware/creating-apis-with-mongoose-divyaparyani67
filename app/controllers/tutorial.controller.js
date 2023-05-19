const db = require("../models");
const Tutorial = db.tutorials;

//pagination

//saves a new tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const tutorial = new Tutorial({
    title: req.body.title,
    author: req.body.author,
    likes: req.body.likes,
    ratings: req.body.ratings,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  });

  //save tutorial in database
  tutorial
    .save(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || " Some error occurred while creating the tutorial",
      });
    });
};

//retrieve all tutorials
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Tutorial.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred whilr retrieving tutorials",
      });
    });
};

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

//retrieve all tutorials with pagination
exports.findAllByPage = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  const { limit, offset } = getPagination(page, size);

  Tutorial.paginate(condition, { limit, offset })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        tutorials: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred whilr retrieving tutorials",
      });
    });
};

//find one tutorial
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retriving tutorial with id  " + id });
    });
};

// update a tutorial by id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "data to update cannot be empty",
    });
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `cannot upddate the Tutorial with id ${id}.`,
        });
      } else res.send({ message: "tutorial was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id" + id,
      });
    });
};

//delete a tutorial by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id ${id}`,
        });
      } else {
        res.send({ message: `tutorial was deleted successfully` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Tutorial could not get deleted with id ${id}`,
      });
    });
};

//delete all tutorialsa
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Tutorials deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occured while removing all tutorials",
      });
    });
};

//find all published tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "some error occured while retrieving tutorials.",
      });
    });
};

//find all published tutorials with paginaton
exports.findAllPublishedByPage = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Tutorial.paginate({ published: true }, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        tutorials: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "some error occured while retrieving tutorials.",
      });
    });
};
