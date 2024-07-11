import PostSkeleton from "../Skeletons/PostSkeleton";
import SinglePost from "../SinglePost";
import {useQuery} from '@tanstack/react-query'
import { useEffect } from "react";
import { PostEndPointApi } from "../../services/post-api";

export default function Posts({ feedType, username, userId }) {
  const getPostEndPoint = () => {
    switch (feedType) {
      case "forYou":
        return "all-posts";
      case "following":
        return "following-posts";
      case "posts":
        return `user-post/${username}`;
      case "likes":
        return `liked-posts/${userId}`;
      default:
        return "all-posts";
    }
  };

  const POST_ENDPOINT = getPostEndPoint();
  const {
    data: posts,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["posts-api"],
    queryFn: () => PostEndPointApi(POST_ENDPOINT),
  });

  useEffect(() => {
    refetch();
  }, [feedType, refetch, username]);

  return (
    <>
      {(isLoading || isRefetching) && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && !isRefetching && posts?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}
      {!isLoading && !isRefetching && posts && (
        <div>
          {posts?.map((post) => (
            <SinglePost key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
