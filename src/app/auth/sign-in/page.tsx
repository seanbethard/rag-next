import { redirect } from 'next/navigation'

import { getSession } from '@/app/_data/user'
import { Heading } from '@/components/cult/gradient-heading'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { OTPForm } from './oauth-form'
import {BikerScumGif} from "@/components/ui/icons";

export default async function SignIn() {
  const session = await getSession()

  if (session) {
    return redirect('/')
  }

  return (
    <>
      <section className="h-full w-full">
        <div className=" flex flex-col justify-center items-center mt-16 md:mt-36">
          <div className="flex gap-2">
            <BikerScumGif id="bikerscum" alt="Biker Scum" />
            <div>
              <Heading size="xxl">Biker Scum</Heading>
              <Heading size="xs" variant="secondary" className="-mt-2 md:-mt-4">
                finally, a motorcycle mechanic that can reed good
              </Heading>
            </div>
          </div>
          <div className="flex items-center justify-center pt-12 md:pt-24 ">
            <Card>
              <CardHeader>
                <CardTitle>Repair procedures for humans</CardTitle>
                <CardDescription>Wiring diagrams for scumbags</CardDescription>
              </CardHeader>
              <CardContent className=" space-y-2">
                <div className="space-y-2 w-full min-w-[16rem] lg:min-w-[24rem]">
                  <OTPForm />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
