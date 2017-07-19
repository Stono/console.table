'use strict';

var expect = require('expect.js');
var assert = require('better-assert');
var sinon = require('sinon');
var table;
function loadMethod() {
  table = require('../index');
}

function cleanLoadedCache() {
  // make sure the module is loaded without caching
  delete require.cache[require.resolve('../index')];
}

describe('table', function () {
  beforeEach(cleanLoadedCache);

  it('fills missing method', function () {
    expect(table).to.be(undefined);
  });

  it('installs html method', function () {
    loadMethod();
    expect(typeof table).to.be('function');
  });

  it('logs simple string', function () {
    loadMethod();
    sinon.spy(console, 'log');
    table('foo');
    assert(console.log.firstCall.calledWith('foo'));
    console.log.restore();
  });

  it('logs several strings separately', function () {
    loadMethod();
    sinon.spy(console, 'log');
    table('foo', 'bar');
    assert(console.log.firstCall.calledWith('foo'));
    assert(console.log.secondCall.calledWith('bar'));
    console.log.restore();
  });

  it('can print title', function () {
    loadMethod();
    table('These are numbers', [1, 2, 3]);
  });

  it('objects with title', function () {
    var objects = [
      {
        name: 'foo',
        age: 10
      },
      {
        name: 'bar',
        age: 20
      },
      {
        name: 'baz',
        age: 30
      }
    ];
    loadMethod();
    table('Several objects', objects);
  });
});

describe('table object', function () {
  beforeEach(function () {
    cleanLoadedCache();
    loadMethod();
  });

  it('prints an object', function () {
    table({ foo: 'foo', bar: 'bar' });
  });

  it('prints an object', function () {
    table('this is an object', { foo: 'foo', bar: 'bar' });
  });
});
