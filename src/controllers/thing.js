const Thing = require("../models/Thing.js");

exports.postThing = async (req, res, next) => {
  try {
    delete req.body._id;
    const thing = await new Thing({
      ...req.body,
    });
    thing.save();
    res.status(201).json({ message: "Thing added successfuly !", thing });
  } catch (error) {
    res.status(400).json({ err });
  }
  next();
};

exports.getThings = async (req, res, next) => {
  try {
    const things = await Thing.find({});
    res.status(200).json(things);
    console.log(things);
  } catch (error) {
    res.status(400).json({ error });
  }
  next();
};

exports.getThing = async (req, res, next) => {
  try {
    const thing = await Thing.findOne({ _id: req.params.id });
    res.status(200).json(thing);
  } catch (error) {
    res.status(404).json({ error });
  }
  next();
};

exports.putThing = async (req, res, next) => {
  try {
    const thing = await Thing.updateOne(
      { _id: req.params.id },
      { ...req.body, _id: req.params.id }
    );
    res.status(200).json({ message: "Thing updated successfuly !", thing });
  } catch (error) {
    res.status(400).json({ error });
  }
  next();
};

exports.deleteThing = async (req, res, next) => {
  try {
    const thing = await Thing.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Thing deleted successfuly !", thing });
  } catch (error) {
    res.status(400).json({ error });
  }
  next();
};
