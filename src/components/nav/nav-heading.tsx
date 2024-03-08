'use client'

import Link from 'next/link'

import { Heading } from '@/components/cult/gradient-heading'
import {BikerScumGif} from "@/components/ui/icons";

export function NavHeading({ isCollapsed }) {
  return (
    <div className="flex pt-4 md:pl-[0px] flex-row items-center justify-between md:justify-start">
      <div
        className={
          isCollapsed
            ? 'flex justify-center items-center space-x-3 w-full'
            : 'flex justify-start items-start space-x-3 w-full md:pl-[20px]'
        }
      >
        <Link href="/" className=" flex justify-center items-center space-x-4">
            <BikerScumGif id="bikerscum" alt="Biker Scum" />
            <br/>
          {/*{!isCollapsed ? <Heading size="xxs" >Biker Scum</Heading>: null}*/}
        </Link>
      </div>
    </div>
  )
}
