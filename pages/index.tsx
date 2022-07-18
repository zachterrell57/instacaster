import type { NextPage } from 'next'
import { useState } from 'react'
import type { GenericCast } from '../types'
import Header from '../components/Header';
import GenericCastComponent from '../components/GenericCastComponent';
import InfiniteScroll from 'react-infinite-scroll-component';

type HomeProps = {
  castsProp: GenericCast[]
}

let pageNumber: number = 1;

const Home: NextPage<HomeProps> = ({ castsProp }) => {
  const [casts, setCasts] = useState<GenericCast[]>(castsProp)
  const [hasMore] = useState<boolean>(true)

  const fetchNewData = async () => {
    pageNumber++;
    await fetch('https://searchcaster.xyz/api/search?text=imgur&count=20&page=' + pageNumber,
    ).then(res => res.json())
      .then(data => {
        data['casts'].map((jsonCast: any) => {
          setCasts(casts => casts.concat(jsonCast as GenericCast))
        })
      })
  };

  const castFeed = (
    <InfiniteScroll
      dataLength={casts.length} //This is important field to render the next data
      next={fetchNewData}
      scrollThreshold={0.8}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      scrollableTarget="scrollableDiv"
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="casts flex w-full flex-col items-center justify-center">
        {casts.map((cast: GenericCast, index: number) => (
          cast.body.data.image ?
            <GenericCastComponent cast={cast} initImage={index == 0 || index == 1 ? true : false} key={index} /> : null
        ))}
      </div>
    </InfiniteScroll>
  )

  return (
    <>
      <Header />

      <div className="h-screen w-screen overflow-x-hidden bg-primary" id='scrollableDiv'>
        <nav
          className="sticky top-0 z-10 flex h-14 w-screen items-center justify-center border-b border-border-gray bg-white"
        >
          <span className="font-source-code-pro text-3xl font-normal">Instacaster 📸</span>
        </nav>
        <div className="flex justify-center">
          {casts ? castFeed : null}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {

  const castsProp: GenericCast[] = [];
  await fetch('https://searchcaster.xyz/api/search?text=imgur&count=20'
  ).then(res => res.json())
    .then(data => {
      data['casts'].map((jsonCast: any) => {
        castsProp.push(jsonCast as GenericCast)
      });
    })

  // Pass data to the page via props
  return { props: { castsProp } }
}

export default Home
