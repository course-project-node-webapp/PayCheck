/* globals Promise */

'use strict';

module.exports = function (Organization) {
  function createOrganization(organization) {
    return new Promise((resolve, reject) => {
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

  function findPage(page, size) {
    return new Promise((resolve, reject) => {
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
  }

  return {
    createOrganization,
    findById,
    findByName,
    findPage
  };
};