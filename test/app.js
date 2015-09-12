"use strict";
var request = require('supertest');
var should = require('should');
var app = require('../app');

describe('/', function(){
    it('init', function(){
        (true).should.be.true();
    });
    it('X-Frame-Options should be set to ALLOWALL', function(done){
        request(app)
            .get('/')
            .expect('X-Frame-Options', 'ALLOWALL')
            .expect(200, done);
    });
});