import type { NextPage } from 'next'
import Head from 'next/head'
import PostBox from '../components/PostBox'
import Feed from '../components/Feed'
import { GET_TOPICS_WITH_A_LIMIT } from '../Queries/queries'
import { useQuery } from '@apollo/client'
import TopicRow from '../components/TopicRow'

const Home: NextPage = () => {

  const { data } = useQuery(GET_TOPICS_WITH_A_LIMIT, {
    variables: {
      limit: 5,
    },})

    const topics: Topic[] = data?.getTopicWithLimit

  return (
    <div className="mx-auto my-16 -z-1 justify-center align-center min-w-fit">
      <Head>
        <title>CIVILISED FORUM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='h-screen max-w-5xl  mx-auto'>
        <PostBox/>
        <div className='flex'>
        <Feed />
        <div className="sticky top-36 mx-5 mt-20 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
          <p className="text-md mb-1 p-4 pb-3 font-bold">TOPICS YOU MAY LIKE</p>

          <div>
            {topics?.map((topic, i) => (
              <TopicRow
                key={topic?.id}
                index={i}
                topic={topic?.topic}
              />
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Home
