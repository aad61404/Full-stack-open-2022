const personsRouter = require("express").Router();
const Person = require("../models/person");

// personsRouter.get("/", (req, res) => {
//   res.send("<h1>Hello </h1>");
// });

personsRouter.get("/", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

personsRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      return next(error);
    });
});

personsRouter.post("/", async (req, res, next) => {
  const body = req.body;
  const { name, number } = body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "The name or number is missing" });
  }

  const isDuplicate = await Person.findOne({ name: name });

  if (isDuplicate) {
    return res
      .status(400)
      .json({ error: "The name already exists in the phonebook" });
  }

  const newPPL = new Person({
    name,
    number,
  });

  newPPL
    .save()
    .then((savePerson) => {
      res.json(savePerson);
    })
    .catch((error) => next(error));
});

personsRouter.put("/:id", async (req, res) => {
  try {
    const { name, number } = req.body;
    const person = {
      name,
      number,
    };
    const updatePerson = await Person.findByIdAndUpdate(req.params.id, person, {
      new: true,
    });
    res.json(updatePerson);
  } catch (error) {
    next(error);
  }
});

personsRouter.delete("/:id", async (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

// personsRouter.get("/", (req, res) => {
//   res.send("<h1>Hello </h1>");
// });

personsRouter.get("/info", (req, res) => {
  var time = new Date();
  res.send(`<div><p>Pheonebook has info for 2 people</p><p>${time}</p></div>`);
});

module.exports = personsRouter;
