import express from "express";
import zod from "zod"
const app = express();

app.get("/", function (req, res) {
  const n = req.query.n;
  const ans = n * n;

  res.send(ans.toString());
});

//app.use(express.json());

const users = [
  {
    name: "Aksh",
    kidneys: [
      {
        healthy: true,
      },
    ],
  },
  {
    name: "Diksh",
    kidneys: [
      {
        healthy: true,
      },
    ],
  },
];

app.get("/getKedneyInfo", function (req, res) {
  const akshKidneys = users[0].kidneys;
  const numOfKidneys = akshKidneys.length;
  let numOfHealthyKid = akshKidneys?.filter((kidney) => kidney?.healthy).length;

  res.json({
    numOfKidneys,
    numOfHealthyKid,
  });
});

app.post("/updateStatus", function (req, res) {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({ healthy: isHealthy });
  res.json({ msg: "Done dana done" });
});

const numOfReq = 0;

function calculateRequest(req, res, next) {
  numOfReq++;
  console.log(numOfReq);
}

function usernameValidate(req, res, next) {
  if (username === "harkirat" && password === "pass") {
    res.status(403).json({
      msg: "User not found",
    });
  } else {
    next();
  }
}

function kidneyValidate(req, res, next) {
  if (kidneyId !== 1 && kidneyId !== 2) {
    res.status(411).json({
      msg: "Wrong input",
    });
  } else {
    next();
  }
}

//app.use(calculateRequest);
app.use(express.json());

app.get("/health-checkup", (req, res) => {
  const username = req.headers.username;
  const password = req.headers.password;
  const kidneyId = req.query.kidneyId;

  if (!usernameValidate(username, password)) {
    res.status(403).json({
      msg: "User not found",
    });
  }

  if (!kidneyValidate(kidneyId)) {
    res.status(411).json({
      msg: "Wrong input",
    });
  }

  res.json({
    msg: "Your heart is healthy",
  });
});

const schema = zod.array(zod.number())

app.post("/health-checkup", function (req, res) {
  console.log('kidneys 1', req.body)
  const kidneys = req.body.kidneys;
  const response= schema.safeParse(kidneys);
  //const kidneysLength = kidneys.length;

  res.send({response});
});

app.use(function (err, req, res, next) {
  console.log('kidneys 2')
  res.json({
    msg: "Something went wrong",
  });
});

app.listen(3000);
