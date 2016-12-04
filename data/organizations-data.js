/* globals Promise */

'use strict';
const validator = require('validator');
module.exports = function ({ models }) {
  const {
    Organization
  } = models;

  function createOrganization(organization) {
    return new Promise((resolve, reject) => {
      if (!organization.name || !validator.isAlphanumeric(organization.name)) {
        throw new Error('Invalid organization name.');
      }

      if (organization.image && !validator.isURL(organization.image)) {
        throw new Error('Invalid image url.');
      }

      if (!organization.owners || !Array.isArray(organization.owners)) {
        throw new Error('Invalid owners list.');
      }

      organization.name = validator.escape(organization.name);

      const newOrganization = Organization.getOrganization(organization);
      newOrganization.save((err) => {
        if (err) {
          return reject(err);
        }

        return resolve(newOrganization);
      });
    });
  }

  function findById(id) {
    return new Promise((resolve, reject) => {
      Organization.findOne({
        _id: id
      }, (err, organization) => {
        if (err) {
          return reject(err);
        }

        return resolve(organization);
      });
    });
  }

  function findByName(name) {
    return new Promise((resolve, reject) => {
      Organization.findOne({
        name
      }, (err, organization) => {
        if (err) {
          return reject(err);
        }

        return resolve(organization);
      });
    });
  }

  function getOrganizationsWhichContains(string) {
    let regex = new RegExp(string, 'i');

    return new Promise((resolve, reject) => {
      Organization.find({
        name: regex
      }, (err, organizations) => {
        if (err) {
          return reject(err);
        }

        return resolve(organizations);
      });
    });
  }

  function findPage(page, size) {
    const promiseData = new Promise((resolve, reject) => {
      Organization.find()
        .skip(page * size)
        .limit(size)
        .exec((err, organizations) => {
          if (err) {
            return reject(err);
          }

          return resolve(organizations);
        });
    });

    const promisePageCount = new Promise((resolve, reject) => {
      Organization.count((err, count) => {
        if (err) {
          return reject(err);
        }

        const pageCount = Math.ceil(count / size);
        return resolve(pageCount);
      });
    });

    return Promise.all([
      promiseData,
      promisePageCount
    ]);
  }

  function updateOrganization(organization) {
    return new Promise((resolve, reject) => {
      organization.save((err, updated) => {
        if (err) {
          return reject(err);
        }

        return resolve(updated);
      });
    });
  }

  return {
    createOrganization,
    findById,
    findByName,
    getOrganizationsWhichContains,
    findPage,
    updateOrganization
  };
};