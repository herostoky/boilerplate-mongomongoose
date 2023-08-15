require('dotenv').config();
let mongoose = require("mongoose");
// let validator = require("validator");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
  /*email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value);
    }
  }*/
});
let Person = mongoose.model('Person', personSchema);;

const createAndSavePerson = (done) => {
  let personEntity = new Person({
    name: "Rakouth",
    age: 26,
    favoriteFoods: ["Ravitoto", "Henakisoa"]
  });
  personEntity.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

let rakouth = new Person({
  name: "Rakouth",
  age: 26,
  favoriteFoods: ["Ravitoto", "Henakisoa"]
});
let rabe = new Person({
  name: "Rabe",
  age: 25,
  favoriteFoods: ["Hena", "Voatabia"]
});
let arrayOfPeople = [rakouth, rabe];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const findPeopleByName = (personName, done) => {
  let query = { name: personName };
  Person.find(query, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const findOneByFood = (food, done) => {
  let query = { favoriteFoods: food };
  Person.findOne(query, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, personFound) {
    if (err) return console.error(err);
    personFound.favoriteFoods.push(foodToAdd);
    personFound.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson)
    })
    // done(null, data)
  });
  // done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  let query = { name: personName };
  let updateSet = { age: ageToSet };
  let options = { new: true };

  Person.findOneAndUpdate(query, updateSet, options,
    (err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });

  // done(null /*, data*/);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,
    (err, deletedPerson) => {
      if (err) return console.log(err);
      done(null, deletedPerson);
    });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
