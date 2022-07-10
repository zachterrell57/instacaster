import type { NextPage } from 'next'
import type { GenericCast } from '../types'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Cast from '../components/cast'
import useSWR from 'swr'

type HomeProps = {
  casts: GenericCast[]
}

const Home: NextPage<HomeProps> = ({ casts }) => {
  // const [casts, setCasts] = useState<Cast[]>([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetch('https://farcaster-search.gregskril.com/api/search?text=imgur',
  //     ).then(res => res.json())
  //       .then(data => {
  //         data['casts'].map((jsonCast: any) => {
  //           setCasts(casts => [...casts, (jsonCast as Cast)])
  //         });
  //       })
  //   }
  //   fetchData();
  // }, [])

  const castFeed = (
    <div className="casts flex w-full flex-col items-center justify-center">
      {casts.map((cast: GenericCast, index: number) => (
        <Cast cast={cast} index={index} />
      ))}
    </div>
  )

  const errorFeed = (
    <div>Error</div>
  )

  return (
    <div className="h-screen w-screen overflow-x-hidden bg-primary">
      <nav
        className="sticky top-0 flex h-14 w-screen items-center justify-center border-b border-border-gray bg-white"
      >
        <span className="font-source-code-pro text-3xl font-normal">Instacaster 📸</span>
      </nav>
      <div className="flex justify-center">
        {casts ? castFeed : null}
      </div>
    </div>
  )
}

export async function getServerSideProps() {

  const casts: GenericCast[] = [];

  // Fetch data from external API
  await fetch('https://farcaster-search.gregskril.com/api/search?text=imgur'
  ).then(res => res.json())
    .then(data => {
      data['casts'].map((jsonCast: any) => {
        casts.push(jsonCast as GenericCast)
      });
    })

  // Pass data to the page via props
  return { props: { casts } }
}

export default Home
