const { sanitizePhoneNumber } = require('../helper/sanitize')
const assert = require('assert')

describe('Math Functions', function() {
    it('sanitize phoneNumber', function() {
      assert.strictEqual(sanitizePhoneNumber("081291111111"), "+6281291111111")
    })
  
    it('sanitize phoneNumber', function() {
      assert.strictEqual(sanitizePhoneNumber("+6281291111111"), "+6281291111111")
    })

    it('sanitize phoneNumber', function() {
        assert.strictEqual(sanitizePhoneNumber("6281291111111"), false)
    })

    it('sanitize phoneNumber', function() {
        assert.strictEqual(sanitizePhoneNumber("asd123aasda"), false)
    })
  })