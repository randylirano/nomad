// Extract a specific element from the mongo library installed in our project
const { MongoClient } = require("mongodb");

// Mask and define the db connection string using an environment variable or default to the localhost port
const url = process.env.MONGO_URL || "mongodb://loclhost:27017";

/* @authenticateUser -- This method is invoked when a user attempts to log in
   The database is queried with the request object for a document with a matching 
   email-password field pair 
   @param -- object with fields "login_email" and "password"
   @returns -- "200-OK" if matching, "404-ERROR" if otherwise
*/
function myMongoDB(query) {
  const myDB = {};

  //"credential.login_email": authUserQuery.login_email,
  //      "credential.password": authUserQuery.password,
  //
  async function getCollection(colName) {
    const client = new MongoClient(url);

    await client.connect();
    console.log("myMongoDB.js: getCollection modue loaded...");
    console.log("myMongoDB.js: db connection established...");

    const db = client.db("nomad");
    return [client, db.collection(colName)];
  }

  myDB.authenticateUsers = async function (authUserQuery) {
    console.log("myMongoDB.js: authenticateUsers module loaded...");
    console.log(authUserQuery);

    const client = new MongoClient(url);
    await client.connect();
    const db = client.db("nomad");
    collection = db.collection("Users");

    collection.find({ first_name: "Vincenz" }).forEach(function (doc) {
      console.log(doc);
    });
    try {
      return await collection
        .find({
          "credential.login_email": authUserQuery.login_email,
          "credential.password": authUserQuery.password,
        })
        .toArray();
    } finally {
      await client.close();
    }
  };

  myDB.getProjects = async function () {
    console.log("myMongoDB.js: getProjects module loaded...");

    let client, col;
    try {
      [client, col] = getCollection("Projects");
      const query = {};

      return await col.find(query).toArray();
    } finally {
      await client.close();
    }
  };

  myDB.createProjects = async function (newProject) {
    console.log("myMongoDB.js: createProjects module loaded...");

    let client, col;
    try {
      [client, col] = getCollection("Projects");
      const query = {};

      return await col.insertOne(query).toArray();
    } finally {
      await client.close();
    }
  };

  return myDB;
}

module.exports = myMongoDB();
