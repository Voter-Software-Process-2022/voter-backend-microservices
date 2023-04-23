import { Loader, Navbar, RuleModal, Sidebar } from '../../components'
import { Fragment, useEffect, useState } from 'react'
import InfoList from '../../components/InfoList'
import type { CandidateI } from '../../interfaces/candidate'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchAllCandidates } from '../../features/candidate/candidateSlice'
import { ToastContainer } from 'react-toastify'
import { authenticatedUser } from '../../features/user/userSlice'

const Info: React.FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false)
  const [isOpenRuleModal, setIsOpenRuleModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [candidates, setCandidates] = useState<CandidateI[]>()
  const authUser = useAppSelector(authenticatedUser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const { payload }: any = await dispatch(fetchAllCandidates())
      setCandidates(payload.data)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className='min-h-screen bg-white'>
      <div className='flex flex-col'>
        <Navbar
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <div className='relative flex flex-col pb-16'>
            <ToastContainer
              position='bottom-right'
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='dark'
            />
            <Sidebar
              isOpenSidebar={isOpenSidebar}
              setIsOpenSidebar={setIsOpenSidebar}
            />
            {candidates ? (
              <Fragment>
                <InfoList candidates={candidates} />
                <button
                  onClick={() => setIsOpenRuleModal(true)}
                  className='hover:bg-gray-700 focus:outline-none p-3 w-16 self-center flex-center text-center text-white bg-gray-600 rounded'
                >
                  Vote
                </button>
              </Fragment>
            ) : (
              <div className='my-8'>
                <span className='text-black text-xl flex justify-center'>
                  Not found available candidates...
                </span>
              </div>
            )}
            <RuleModal
              canVote={!authUser ? false : authUser.hasRight}
              isOpenRuleModal={isOpenRuleModal}
              setIsOpenRuleModal={setIsOpenRuleModal}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Info
