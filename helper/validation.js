function validateName(name) {
    const nameRegex = /^[A-Za-z\s]+$/
    return nameRegex.test(name)
}

function validatePhoneNumber(phone) {
    const phoneRegex = /^\+62\d{8,14}$/
    return phone.length >= 10 && phone.length <= 15 && phoneRegex.test(phone)
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+(\.[^\s@]+)+$/
    return emailRegex.test(email) && !/\.{2,}/.test(email)
}


module.exports = { validateName, validatePhoneNumber, validateEmail }