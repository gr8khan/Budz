'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Cook = mongoose.model('Cook'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, cook;

/**
 * Cook routes tests
 */
describe('Cook CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Cook
    user.save(function () {
      cook = {
        name: 'Cook name'
      };

      done();
    });
  });

  it('should be able to save a Cook if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Cook
        agent.post('/api/cooks')
          .send(cook)
          .expect(200)
          .end(function (cookSaveErr, cookSaveRes) {
            // Handle Cook save error
            if (cookSaveErr) {
              return done(cookSaveErr);
            }

            // Get a list of Cooks
            agent.get('/api/cooks')
              .end(function (cooksGetErr, cooksGetRes) {
                // Handle Cook save error
                if (cooksGetErr) {
                  return done(cooksGetErr);
                }

                // Get Cooks list
                var cooks = cooksGetRes.body;

                // Set assertions
                (cooks[0].user._id).should.equal(userId);
                (cooks[0].name).should.match('Cook name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Cook if not logged in', function (done) {
    agent.post('/api/cooks')
      .send(cook)
      .expect(403)
      .end(function (cookSaveErr, cookSaveRes) {
        // Call the assertion callback
        done(cookSaveErr);
      });
  });

  it('should not be able to save an Cook if no name is provided', function (done) {
    // Invalidate name field
    cook.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Cook
        agent.post('/api/cooks')
          .send(cook)
          .expect(400)
          .end(function (cookSaveErr, cookSaveRes) {
            // Set message assertion
            (cookSaveRes.body.message).should.match('Please fill Cook name');

            // Handle Cook save error
            done(cookSaveErr);
          });
      });
  });

  it('should be able to update an Cook if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Cook
        agent.post('/api/cooks')
          .send(cook)
          .expect(200)
          .end(function (cookSaveErr, cookSaveRes) {
            // Handle Cook save error
            if (cookSaveErr) {
              return done(cookSaveErr);
            }

            // Update Cook name
            cook.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Cook
            agent.put('/api/cooks/' + cookSaveRes.body._id)
              .send(cook)
              .expect(200)
              .end(function (cookUpdateErr, cookUpdateRes) {
                // Handle Cook update error
                if (cookUpdateErr) {
                  return done(cookUpdateErr);
                }

                // Set assertions
                (cookUpdateRes.body._id).should.equal(cookSaveRes.body._id);
                (cookUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Cooks if not signed in', function (done) {
    // Create new Cook model instance
    var cookObj = new Cook(cook);

    // Save the cook
    cookObj.save(function () {
      // Request Cooks
      request(app).get('/api/cooks')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Cook if not signed in', function (done) {
    // Create new Cook model instance
    var cookObj = new Cook(cook);

    // Save the Cook
    cookObj.save(function () {
      request(app).get('/api/cooks/' + cookObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', cook.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Cook with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/cooks/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Cook is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Cook which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Cook
    request(app).get('/api/cooks/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Cook with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Cook if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Cook
        agent.post('/api/cooks')
          .send(cook)
          .expect(200)
          .end(function (cookSaveErr, cookSaveRes) {
            // Handle Cook save error
            if (cookSaveErr) {
              return done(cookSaveErr);
            }

            // Delete an existing Cook
            agent.delete('/api/cooks/' + cookSaveRes.body._id)
              .send(cook)
              .expect(200)
              .end(function (cookDeleteErr, cookDeleteRes) {
                // Handle cook error error
                if (cookDeleteErr) {
                  return done(cookDeleteErr);
                }

                // Set assertions
                (cookDeleteRes.body._id).should.equal(cookSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Cook if not signed in', function (done) {
    // Set Cook user
    cook.user = user;

    // Create new Cook model instance
    var cookObj = new Cook(cook);

    // Save the Cook
    cookObj.save(function () {
      // Try deleting Cook
      request(app).delete('/api/cooks/' + cookObj._id)
        .expect(403)
        .end(function (cookDeleteErr, cookDeleteRes) {
          // Set message assertion
          (cookDeleteRes.body.message).should.match('User is not authorized');

          // Handle Cook error error
          done(cookDeleteErr);
        });

    });
  });

  it('should be able to get a single Cook that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Cook
          agent.post('/api/cooks')
            .send(cook)
            .expect(200)
            .end(function (cookSaveErr, cookSaveRes) {
              // Handle Cook save error
              if (cookSaveErr) {
                return done(cookSaveErr);
              }

              // Set assertions on new Cook
              (cookSaveRes.body.name).should.equal(cook.name);
              should.exist(cookSaveRes.body.user);
              should.equal(cookSaveRes.body.user._id, orphanId);

              // force the Cook to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Cook
                    agent.get('/api/cooks/' + cookSaveRes.body._id)
                      .expect(200)
                      .end(function (cookInfoErr, cookInfoRes) {
                        // Handle Cook error
                        if (cookInfoErr) {
                          return done(cookInfoErr);
                        }

                        // Set assertions
                        (cookInfoRes.body._id).should.equal(cookSaveRes.body._id);
                        (cookInfoRes.body.name).should.equal(cook.name);
                        should.equal(cookInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Cook.remove().exec(done);
    });
  });
});
