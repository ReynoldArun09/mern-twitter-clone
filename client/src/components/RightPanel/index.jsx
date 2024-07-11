import RightPanelSkeleton from "../Skeletons/RightPanelSkeleton"
import placeholderimg from '../../assets/images/avatar-placeholder.png'
import LoadingSpinner from "../common/LoadingSpinner"
import {useQuery} from '@tanstack/react-query'
import {Link} from 'react-router-dom'
import { GetSuggestedUsersApi } from "../../services/user-api"
import useFollow from "../../hooks/useFollow"

export default function RightPanel() {

  const {data: suggestedUsers, isLoading} = useQuery({
		queryKey: ['suggested-users'],
		queryFn: GetSuggestedUsersApi
	})

	const {follow, isPending} = useFollow()

	if (suggestedUsers?.length === 0) return <div className='md:w-64 w-0' />

	const handleFollow = (userId) => {
    follow(userId)
  }

  return (
    <div className='hidden lg:block my-4 mx-2'>
    <div className='bg-[#16181C] p-4 rounded-md sticky top-2'>
      <p className='font-bold'>Who to follow</p>
      <div className='flex flex-col gap-4'>
        {isLoading && (
          <>
            <RightPanelSkeleton />
            <RightPanelSkeleton />
            <RightPanelSkeleton />
            <RightPanelSkeleton />
          </>
        )}
        {!isLoading &&
          suggestedUsers?.map((user) => (
            <Link
              to={`/profile/${user.username}`}
              className='flex items-center justify-between gap-4'
              key={user._id}
            >
              <div className='flex gap-2 items-center'>
                <div className='avatar'>
                  <div className='w-8 rounded-full'>
                    <img src={user.profileImg || placeholderimg} alt="profile-img"/>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <span className='font-semibold tracking-tight truncate w-28'>
                    {user.fullName}
                  </span>
                  <span className='text-sm text-slate-500'>@{user.username}</span>
                </div>
              </div>
              <div>
                <button type="button"
                  className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
                  onClick={() => handleFollow(user._id)}
                >
                  {isPending ? <LoadingSpinner size="sm"/> : 'Follow'}
                </button>
              </div>
            </Link>
          ))}
      </div>
    </div>
  </div>
  )
}
