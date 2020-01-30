const router = require("express").Router();
const User = require("./user.model");

router.route("/").get((req, res) =>
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err))
);

// router.route("/:userId").get((req, res) => {
//   const { userId } = req.params;
//   res.send(`User detail for id=${userId}`);
// });

router.route("/add").post((req, res) => {
  const { name, userId: user_id } = req.body;
  const newUser = new User({
    name,
    user_id
  });
  newUser
    .save()
    .then(() => res.json("done!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
