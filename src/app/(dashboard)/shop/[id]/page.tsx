import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getChatWithSources } from '@/app/_data/chat'
import { createClient } from '@/db/server'

import MainVectorPanel from '../_features/main-panel'

export const runtime = 'edge'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic'

export interface ShopPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ShopPage(props: ShopPageProps) {
  const params = await props.params;
  const db = createClient(await cookies())
  const {
    data: { session },
  } = await db.auth.getSession()

  if (!session?.user) {
    redirect(`/auth/sign-in?next=/shop/${params.id}`)
  }

  const { payload, sources } = await getChatWithSources(params.id)

  if (!payload) {
    redirect('/shop')
  }

  if (payload?.userId !== session?.user?.id) {
    redirect('/')
  }

  return (
    <MainVectorPanel
      initialMessages={payload.messages}
      id={params.id}
      user={session?.user}
      initialSources={sources}
    />
  )
}
