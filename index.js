const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 5000;

// middleware
app.use(express());
app.use(express.json());
app.use(cors());

// =============================MongoDB section====================================
// Coffee-Espresso-Emporium
// FarRHqZwgUdIExjV

// =================================================================

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fmvmv30.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // =======================creating the database(Overall, this line of code is defining a constant variable coffeeCollection that represents a MongoDB collection. You can use coffeeCollection to perform various operations on the "coffee" collection within the "coffeeDB" database, such as inserting, updating, deleting, or querying documents in that collection.)==========================================
    const coffeeCollection = client.db("coffeeEspressoDB").collection("coffee");

    // =======================Post data to the database via server==========================================
    app.post("/coffee", async (req, res) => {
      const newCoffee = req.body;
      console.log(newCoffee); //show in the server console
      const result = await coffeeCollection.insertOne(newCoffee);
      res.send(result); //sending data to server to database
    });
    // ================================get coffee from database to server=============================================================
    app.get("/coffee", async (req, res) => {
      const cursor = coffeeCollection.find();
      const result = await cursor.toArray();
      res.send(result); //sending data to get all coffee from database
    });

    // ==============================Update a specific coffee item===================================
    app.get("/coffee/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeeCollection.findOne(query);
      res.send(result);
    });

    app.put("/coffee/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateCoffee = req.body;

      const coffee = {
        $set: {
          name: updateCoffee.name,
          quantity: updateCoffee.quantity,
          supplier: updateCoffee.supplier,
          taste: updateCoffee.taste,
          price: updateCoffee.price,
          details: updateCoffee.details,
          photo: updateCoffee.photo,
        },
      };
      const result = await coffeeCollection.updateOne(filter, coffee, options);
      res.send(result);
    });
    // ==================================delete coffee from data database and Ui===========================================================
    app.delete("/coffee/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeeCollection.deleteOne(query);
      res.send(result);
    });

    // =============================================================================================================================

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();// always close the connection by yourself
  }
}
run().catch(console.dir);

// =============================================================================

// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
app.get("/", (req, res) => {
  res.send("Coffee Making Server is Running!!!!!!!");
});

app.listen(port, () => {
  console.log(`Coffee server is running on port ${port}`);
});
// =============================================================================
