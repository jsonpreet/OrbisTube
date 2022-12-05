import { HOME } from '@utils/paths'
import { Button } from '@app/components/UI/Button'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { APP } from '@utils/constants'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <div className="flex flex-col items-center justify-start h-full mt-10 md:mt-20">
        <Image src='/videso.png' alt={APP.Name} height={35} width={31} />
        <div className="py-10 text-center">
          <h1 className="mb-4 text-3xl font-bold">404</h1>
          <div className="mb-6">This page could not be found.</div>
          <Link href={HOME}>
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    </>
  )
}