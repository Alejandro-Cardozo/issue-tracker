const { Schema, model } = require("mongoose");

const issueSchema = new Schema({
  issue_title: String,
  issue_text: String,
  created_on: Date,
  updated_on: Date,
  created_by: String,
  assigned_to: String,
  open: Boolean,
  status_text: String,
});

module.exports = model("Issue", issueSchema);