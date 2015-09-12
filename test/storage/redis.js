"use strict";

var redis = require('../../storage/redis');
var rewire = require('rewire');
var should = require('should');

describe('Redis', function(){

    beforeEach(function(){
        redis = rewire('../../storage/redis');
    });

    describe('#set()', function(){
        it('should set value', function(){
            redis.set('test', 1, 'test item');
            redis.entities['test'][1].should.eql(['test item']);
        });
        it('should rewrite value', function(){
            redis.set('test', 1, 'test item');
            redis.set('test', 1, 'test item changed');
            redis.entities['test'][1].should.eql(['test item changed']);
        });
    });

    describe('#get()', function(){
        it('should get value', function(){
            redis.entities['test'] = {};
            redis.entities['test'][1] = ['test item'];
            redis.get('test', 1).should.eql(['test item']);
        });
        it('should get multiple values', function(){
            redis.entities['test'] = {};
            redis.entities['test'][1] = ['test item1', 'test item2'];
            redis.get('test', 1).should.eql(['test item1', 'test item2']);
        });
    });

    describe('#push()', function(){
        it('should add value', function(){
            redis.push('test', 1, 'test item');
            redis.entities['test'][1].should.eql(['test item']);
        });
        it('should add value to existing values', function(){
            redis.push('test', 1, 'test item1');
            redis.push('test', 1, 'test item2');
            redis.entities['test'][1].should.eql(['test item1', 'test item2']);
        });
    });
});