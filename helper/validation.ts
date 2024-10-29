export function validateName(name: string): boolean {
    const nameRegex = /^[A-Za-z\s]+$/
    return nameRegex.test(name)
}
  
export function validatePhoneNumber(phone: string): boolean {
    const phoneRegex = /^\+62\d{8,14}$/
    return phone.length >= 10 && phone.length <= 15 && phoneRegex.test(phone)
}
  
export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+(\.[^\s@]+)+$/
    return emailRegex.test(email) && !/\.{2,}/.test(email)
}
