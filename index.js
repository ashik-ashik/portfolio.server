const express = require("express");
const app = express();
const port = process.env.PORT || 5500;
const cors = require("cors");
const { MongoClient } = require('mongodb');
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config();


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.muk27.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const run = async () => {
  try{
    await client.connect();
    const database = client.db("portfolio");
    const projectsCollection = database.collection("projects");

    app.post("/pojects", async (req, res) => {

    });
    app.get("/projects", async (req, res) => {
      const result = await projectsCollection.find({}).sort({_id:-1}).toArray();
      res.json(result);
    });
    app.get("/project/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id : ObjectId(id)};
      const result = await projectsCollection.findOne(query);
      console.log(id);
      res.json(result);
    })

  }finally{

  }
};
run().catch(console.dir);

app.get("/", (req, res) => {
  console.log("Personal Portfolio Server is Running");
  res.send("Portfolio Server is Okay");
});

app.listen(port, ()=>{
  console.log("Portfolio Server is running on", port)
})