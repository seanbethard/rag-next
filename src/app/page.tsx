import { redirect } from 'next/navigation'

import { getSession } from '@/app/_data/user'

export const dynamic = 'force-dynamic'

export default async function SignIn() {
  const session = await getSession()

  if (!session) {
    return redirect('/auth/sign-in')
  }

  if (session) {
    return redirect('/shop')
  }
}
