// Extract a specific element from the mongo library installed in our project
const { MongoClient } = require("mongodb");

// Mask and define the db connection string using an environment variable or default to the localhost port
const uri = process.env.MONGO_URL || "mongodb://localhost:27017";

// NOTE: DB_NAME change to nomadDB before publish
const DB_NAME = "nomadLocalDB";
const USERS_COL = "Users";
const PROJECTS_COL = "Projects";


// function to check if provided credential already exist
async function getCredential(inputCredential) {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const nomadDB = client.db(DB_NAME);
    const usersCol = nomadDB.collection(USERS_COL);

    // query new credential in current collection
    const query = {
      credential: {
        login_email: inputCredential.login_email,
        password: inputCredential.password,
      },
    };

    return await usersCol.find(query).toArray();
  } finally {
    await client.close();
  }
}

async function createUser(newUser) {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const nomadDB = client.db(DB_NAME);
    const usersCol = nomadDB.collection(USERS_COL);

    const newUserInfo = {
      user_id: (await usersCol.find().count()) + 1,
      credential: {
        login_email: newUser.login_email,
        password: newUser.password,
      },
      first_name: newUser.first_name,
      last_name: newUser.last_name,
    };

    return await usersCol.insertOne(newUserInfo);
  } finally {
    await client.close();
  }
}

async function getFreelancers() {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const nomadDB = client.db(DB_NAME);
    const usersCol = nomadDB.collection(USERS_COL);
    const query = [
      {
        "$match": {
          "freelancer_info": {
            "$exists": true,
          },
        },
      },
      {
        "$project": {
          "_id": 0,
          "first_name": 1,
          "last_name": 1,
          "freelancer_info": 1,
        },
      },
    ];

    return await usersCol.aggregate(query).toArray();
  } finally {
    await client.close();
  }
}

async function createFreelancer(newFreelancer) {
  const client = new MongoClient(uri);

  try{
    await client.connect();

    const nomadDB = client.db(DB_NAME);
    const usersCol = nomadDB.collection(USERS_COL);

    
  } finally {
    await client.close();
  }
}




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
    const client = new MongoClient(uri);

    await client.connect();
    console.log("myMongoDB.js: getCollection modue loaded...");
    console.log("myMongoDB.js: db connection established...", client);

    const db = client.db("nomad");
    return [client, db.collection(colName)];
  }

  myDB.authenticateUsers = async function (authUserQuery) {
    console.log("myMongoDB.js: authenticateUsers module loaded...");
    console.log(authUserQuery);

    const client = new MongoClient(uri);
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
      [client, col] = await getCollection("Projects");
      console.log("after getCollection", client);
      const query = {};

      console.log("||||||||||||Client and collection initiated||||||||||||");

      return await col.find(query).toArray();
    } finally {
      console.log("get projects finally", client, col);
      await client.close();
    }
  };

  myDB.createProjects = async function (newProject) {
    console.log("myMongoDB.js: createProjects module loaded...");

    let client, col;
    try {
      [client, col] = await getCollection("Projects");
      const query = {};

      return await col.insertOne(query).toArray();
    } finally {
      await client.close();
    }
  };

  return myDB;
}

module.exports = myMongoDB();
module.exports.getCredential = getCredential;
module.exports.createUser = createUser;
module.exports.getFreelancers = getFreelancers;
module.exports.createFreelancer = createFreelancer;
