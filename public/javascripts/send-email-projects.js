// Sends email to a company when "I'm Interested" button is clicked

// This should take the email address of the user currently logged in as a param

// event listener

const Nylas = require("Nylas");

Nylas.config({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

const nylas = Nylas.with(process.env.ACCESS_TOKEN);

const draft = nylas.drafts.build({
  subject: "Nomad: A Candidate is Interested in Your Project!",
  body: "Hello! Someone has declared interest in your project. Please reach out to them to start the conversation.",
  to: [{ name: "Nomad Community Member", email: X }],
});

draft.send().then((message) => {
  console.log(message);
});
