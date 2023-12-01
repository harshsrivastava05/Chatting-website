const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("./db/index"); //connect to DB
const Users = require("./schemas/user");
const port = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("welcome");
});

app.post("/api/register", async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      res.status(400).send("Please fill in all the details!");
    } else {
      const isAlreadyExist = await Users.findOne({ email });
      if (isAlreadyExist) {
        res.status(400).send("User already exists");
      } else {
        const newuser = new Users({ fullname, email });

        bcryptjs.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            throw err;
          }

          newuser.set("password", hashedPassword);
          newuser.save();
          next();
        });
        return res.status(200).send("user registered successfully!");
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
    console.error(error);
  }
});

app.post("/api/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Please fill all information!");
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).send("User email or password not found!");
    }

    const validateuser = await bcryptjs.compare(password, user.password);
    if (!validateuser) {
      return res.status(400).send("User email or password not found!");
    }

    const payload = {
      userId: user._id,
      email: user.email,
    };
    const jwtsecretkey = "this-is-a-secret-key";
    const token = jwt.sign(payload, jwtsecretkey, { expiresIn: "6h" });

    await Users.updateOne(
      { _id: user._id },
      {
        $set: { token },
      }
    );

    user.save();
    next();

    return res
      .status(200)
      .json({
        user: { email: user.email, fullname: user.fullname,pass:user.password, token },
        token: user.token,
      });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error.message);
  }
});

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
