import { ValueObject } from '@/core/entities/value-object'

interface EmailProps {
  value: string
}

export class Email extends ValueObject<EmailProps> {
  get value() {
    return this.props.value
  }

  private static isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  static create(email: string): Email {
    if (!this.isValid(email)) {
      throw new Error(`Invalid email: ${email}`)
    }

    return new Email({ value: email.toLowerCase().trim() })
  }
}
