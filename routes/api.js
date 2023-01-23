'use strict';

const Issue = require('../models/Issue');

module.exports = function (app) {
  app
    .route('/api/issues/:project')

    .get(async function (req, res) {
      const findConditions = {};
      for (const key in req.query) {
        findConditions[key] = req.query[key];
      }
      try {
        const issues = await Issue.find({
          findConditions,
        });
        res.json(issues);
      } catch (error) {
        console.log(error);
      }
    })

    .post(async function (req, res) {
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
      } catch (error) {
        res.status(422).send({ message: 'invalid input' });
        console.log(error);
      }
    })

    .put(async function (req, res) {
      let project = req.body;
      try {
        const updateObj = {};
        for (let key in project) {
          if (!!project[key]) {
            updateObj[key] = project[key];
          }
        }
        updateObj.open = project.open;
        const issue = await Issue.findOneAndUpdate(
          { _id: project._id },
          updateObj,
          { new: true }
        );
        console.log(issue.issue_title + ' issue updated');
        res.send({ result: 'successfully updated', _id: issue._id });
      } catch (error) {
        res.status(422).send({ message: 'invalid input' });
        console.log(error);
      }
    })

    .delete(async function (req, res) {
      try {
        let projectId = req.body._id;
        const result = await Issue.findByIdAndDelete(projectId);
        console.log(result.issue_title + ' issue succesfully deleted');
        res.status(200).send({ result: 'successfully deleted', _id: result._id });
      } catch (error) {
        res.status(422).send({ message: 'invalid _id' });
        console.log(error);
      }
    });
};
