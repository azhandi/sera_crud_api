import { validateName, validatePhoneNumber, validateEmail } from '../helper/validation'
import { strict as assert } from 'assert'

describe('Validation Functions', function() {
  console.log(validateEmail("johndoe123@mail..com"))

  it('should validate phone number correctly', function() {
    assert.strictEqual(validatePhoneNumber("+6281291111111"), true)
  })

  it('should return false for phone number starting with 0', function() {
    assert.strictEqual(validatePhoneNumber("081291111111"), false)
  })

  it('should return false for phone number without valid format', function() {
    assert.strictEqual(validatePhoneNumber("6281291111111"), false)
  })

  it('should return false for invalid phone number formats', function() {
    assert.strictEqual(validatePhoneNumber("asd123aasda"), false)
  })

  it('should return false for invalid name containing numbers', function() {
    assert.strictEqual(validateName("asd123aasda"), false)
  })

  it('should validate name correctly', function() {
    assert.strictEqual(validateName("john doe"), true)
  })

  it('should return false for name containing numbers', function() {
    assert.strictEqual(validateName("john doe123"), false)
  })

  it('should return false for email containing spaces', function() {
    assert.strictEqual(validateEmail("john doe123@mail.com"), false)
  })

  it('should validate email correctly', function() {
    assert.strictEqual(validateEmail("johndoe123@mail.com"), true)
  })

  it('should return false for invalid email format', function() {
    assert.strictEqual(validateEmail("johndoe123@mail..com"), false)
  })
})
