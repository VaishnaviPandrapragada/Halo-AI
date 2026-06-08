const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://HaloAdmin:halo2006@cluster0.wjepcab.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ Connection Failed");
    console.error(err);
  } finally {
    await client.close();
  }
}

run();