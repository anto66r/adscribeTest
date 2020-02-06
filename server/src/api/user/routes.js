const User = require("./user.model");

module.exports = authenticatedRoute => {
  authenticatedRoute.get("/", (req, res, next) => {
    User.find({})
      .then(users => res.json(users))
      .catch(err => res.status(400).json("Error: " + err));
  });

  authenticatedRoute.get("/hello", (req, res, next) => {
    res.send({
      result: true,
      message: `Hi, your API call is authenticated!`
    });
  });

  // router.route("/:userId").get((req, res) => {
  //   const { userId } = req.params;
  //   res.send(`User detail for id=${userId}`);
  // });

  authenticatedRoute.post("/add", (req, res, next) => {
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
  return authenticatedRoute;
};
