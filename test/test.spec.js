const assert = require('assert');

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when not present', function () {
      assert.equal(-1, [1, 2, 3].indexOf(4))
    })
    it('should return the index when present', function (done) {
      setTimeout(() => {
        try {
          assert.equal(-1, [1, 2, 3].indexOf(3))
        } catch (error) {
          done(error);
        }
      }, 1000);
    })
  })

  describe('#every()', function () {
    it('should return true when all items are satisfied', function () {
      assert.equal(true, [1, 2, 3].every(item => !isNaN(item)))
    })
  })
})

describe('Srting', function () {
  describe('#replace', function () {
    it('should return a string that has been replaced', function () {
      assert.equal('hey Hankle', 'hey Densy'.replace('Densy', 'Hankle'))
    })
  })
})