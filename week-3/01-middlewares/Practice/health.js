import express from "express";

const app = express();

app.get("/health-checkup", (req, res)=> {
    const username = req.headers.username;
    const password = req.headers.password;

    if(username === "harkirat" && password === "pass"){
        res.json({
            msg : "your kidney is fine"
        })
    }

    res.json({
        msg: "Request failure"
    })
})

app.listen(3001)