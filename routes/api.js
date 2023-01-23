'use strict';

const issueSchema = require('../models/Issue');
const { model } = require("mongoose");

const issueModel = (project) => (model("Issue", issueSchema, project));

module.exports = function (app) {
  app
    .route('/api/issues/:project')

    .get(async function (req, res) {
      const Issue = issueModel(req.params.project);
      const findConditions = {};
      for (const key in req.query) {
        findConditions[key] = req.query[key];
      }
      try {
        const issues = await Issue.find(findConditions);
        res.status(200).json(issues);
      } catch (error) {
        console.log(error);
      }
    })

    .post(async function (req, res) {
      const Issue = issueModel(req.params.project);
      let date = new Date();
      let project = req.body;
      const issue = new Issue({
        issue_title: project.issue_title,
        issue_text: project.issue_text,
        created_on: date,
        updated_on: date,
        created_by: project.created_by,
        assigned_to: project.assigned_to,
        open: true,
        status_text: project.status_text ? project.status_text : '',
      });
      try {
        await issue.save();
        console.log(project.issue_title + ' issue created');
        res.status(200).send(issue);
      } catch (e) {
        res.status(422).send({ error: 'required field(s) missing' });
        console.log(e);
      }
    })

    .put(async function (req, res) {
      const Issue = issueModel(req.params.project);
      let date = new Date();
      let project = req.body;
      if (!project._id) {
        res.status(422).send({ error: 'missing _id' });
        return;
      }
      try {
        const updateObj = {};
        for (let key in project) {
          if (!!project[key]) {
            updateObj[key] = project[key];
          }
        }
        updateObj.open = project.open;
        updateObj.updated_on = date;
        const issue = await Issue.findOneAndUpdate(
          { _id: project._id },
          updateObj,
          { new: true }
        );
        res.send({ result: 'successfully updated', _id: issue._id });
      } catch (error) {
        res.status(422).send({ error: 'could not update', _id: project._id });
        console.log(error);
      }
    })

    .delete(async function (req, res) {
      const Issue = issueModel(req.params.project);
      let projectId = req.body._id;
      try {
        if (!projectId) {
          res.status(422).send({ error: 'missing _id' });
          return;
        }
        const result = await Issue.findById(projectId);
        res
          .status(200)
          .send({ result: 'successfully deleted', _id: result._id });
      } catch (error) {
        res.status(422).send({ error: 'could not delete', _id: projectId });
        console.log(error);
      }
    });
};
