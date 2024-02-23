import { z } from 'zod'

export const required = (name: string) => z.string().min(1, `${name}が必要`)
export const email = (name = 'メール') => required(name).email(`${name}が無効`)
export const password = (number = 5, name = 'パスワード') =>
  required(name).min(number, `${name}は少なくとも${number}文字でなければなりません`)
