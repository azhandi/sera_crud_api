const { validateName, validatePhoneNumber, validateEmail } = require('../helper/validation')
const assert = require('assert')

describe('Math Functions', function() {
    console.log(validateEmail("johndoe123@mail..com"))
    it('validate phoneNumber', function() {
        assert.strictEqual(validatePhoneNumber("+6281291111111"), true)
    })
  
    it('validate phoneNumber', function() {
      assert.strictEqual(validatePhoneNumber("081291111111"), false)
    })
  
    it('validate phoneNumber', function() {
        assert.strictEqual(validatePhoneNumber("6281291111111"), false)
    })

    it('validate phoneNumber', function() {
        assert.strictEqual(validatePhoneNumber("asd123aasda"), false)
    })

    it('validate validateName', function() {
        assert.strictEqual(validateName("asd123aasda"), false)
    })

    it('validate validateName', function() {
        assert.strictEqual(validateName("john doe"), true)
    })

    it('validate validateName', function() {
        assert.strictEqual(validateName("john doe123"), false)
    })

    it('validate validateEmail', function() {
        assert.strictEqual(validateEmail("john doe123@mail.com"), false)
    })

    it('validate validateEmail', function() {
        assert.strictEqual(validateEmail("johndoe123@mail.com"), true)
    })

    it('validate validateEmail', function() {
        assert.strictEqual(validateEmail("johndoe123@mail..com"), false)
    })
  })