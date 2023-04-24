import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { fetchVoteResults } from '../../features/vote/voteSlice'
import { fetchAllCandidates } from '../../features/candidate/candidateSlice'
import type { CandidateI } from '../../interfaces/candidate'
import { Navbar } from '../../components'

export default function Results() {
  const [results, setResults] = useState<any[]>([])
  const [candidates, setCandidates] = useState<CandidateI[]>([])
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchResultsData = async () => {
      const resultResponse = await dispatch(fetchVoteResults())
      const candidateResponse = await dispatch(fetchAllCandidates())
      setCandidates(candidateResponse.payload.data)
      setResults(resultResponse.payload)
    }

    fetchResultsData()
  }, [])

  return (
    <div className='min-h-screen bg-white'>
      <Navbar
        isOpenSidebar={isOpenSidebar}
        setIsOpenSidebar={setIsOpenSidebar}
      />
      <div className='p-6 text-black'>
        <h1 className='text-6xl text-center'>Results</h1>
        <div className='mt-4 flex flex-wrap gap-x-12'>
          {candidates &&
            candidates.map((candidate) => (
              <div key={candidate.id} className='relative my-4'>
                <div className='absolute bg-gray-400 -top-5 -right-5 rounded-full w-16 h-16 flex items-center justify-center text-white text-xl'>
                  {candidate.id}
                </div>
                <img
                  src={candidate.pictureUrl}
                  alt={candidate.name}
                  className='w-60 rounded-xl'
                />
                <h2 className='mt-2 text-4xl'>{candidate.name}</h2>
                <p>
                  Result:
                  <span className='ml-2 underline'>
                    {results[candidate.id] === undefined
                      ? 'No votes'
                      : `${results[candidate.id] + 1} votes`}
                  </span>
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
