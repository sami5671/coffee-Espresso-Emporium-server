const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
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