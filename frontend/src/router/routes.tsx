import { lazy } from 'react'
import type { IUser } from '../interfaces/user'
import { Navigate } from 'react-router-dom'

const Home = lazy(() => import('../pages/Home'))
const SignUp = lazy(() => import('../pages/SignUp'))
const SignIn = lazy(() => import('../pages/SignIn'))
const Info = lazy(() => import('../pages/Info'))
const SeeAllBallot = lazy(() => import('../pages/SeeAllBallot'))
const ThankYouPage = lazy(() => import('../pages/ThankYouPage'))
const NotFound = lazy(() => import('../pages/NotFound'))
const Vote = lazy(() => import('../pages/Vote'))
const Forbidden = lazy(() => import('../pages/Forbidden'))

const routes = (user: IUser) => [
  {
    path: '/',
    element: <Home />,
  },
  { path: '/register', element: <SignUp /> },
  {
    path: '/login',
    element: !user.isAuthenticated ? <SignIn /> : <Navigate to='/' />,
  },
  { path: '/topics', element: <Info /> },
  {
    path: '/topics/vote',
    element:
      user.isAuthenticated && user.isAcceptedRules ? (
        <Vote />
      ) : (
        <Navigate to='/forbidden' />
      ),
  },
  { path: '/ballots/', element: <SeeAllBallot /> },
  { path: '/thank-you', element: <ThankYouPage /> },
  { path: '/forbidden', element: <Forbidden /> },
  { path: '*', element: <NotFound /> },
]

export default routes
