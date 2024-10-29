export function sanitizePhoneNumber(phone: string): string | false {
    if (phone.startsWith('0')) {
      return '+62' + phone.slice(1)
    } else if (phone.startsWith('+62')) {
      return phone
    } else {
      return false
    }
  }
  