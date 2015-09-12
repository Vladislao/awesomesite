"use strict";
var request = require('supertest');
var should = require('should');
var rewire = require('rewire');
var app = require('../../app');
var redis = require('../../storage/redis');

describe('/api/', function () {
    beforeEach(function(){
        request = rewire('supertest');
        app = rewire('../../app');
        redis = rewire('../../storage/redis')
    });
    describe('/comment/', function () {
        describe('/post/', function () {
            it('should add to store', function (done) {
                var comment = {
                    Text: 'test item'
                };

                request(app)
                    .post('/api/comment/post')
                    .send({key: 'test', comment: comment})
                    .expect(200, done);
            });
        });
        describe('/get/', function () {
            it('should get from store', function (done) {
                var comment = {
                    Text: 'test item'
                };

                var req = request(app);
                req
                    .post('/api/comment/post')
                    .send({key: 'test', comment: comment})
                    .end(function(err, res){
                        req
                            .get('/api/comment/get?key=test')
                                .expect('Content-Type', 'application/json')
                                .expect(200, JSON.stringify([comment, comment]), done);
                    });
            });
        });
    });
});