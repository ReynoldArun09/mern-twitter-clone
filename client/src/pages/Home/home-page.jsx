import { useState } from "react";
import Posts from "../../components/Posts";
import CreatePost from "./create-post";

export default function HomePage() {
  const [feedType, setFeedType] = useState("forYou");
  return (
    <>
      <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen">
        <div className="flex w-full border-b border-gray-700">
          <div
            onClick={() => setFeedType("forYou")}
            className={
              "flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
            }
          >
            For you
            {feedType === "forYou" && (
              <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary" />
            )}
          </div>
          <div
            onClick={() => setFeedType("following")}
            className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
          >
            Following
            {feedType === "following" && (
              <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary" />
            )}
          </div>
        </div>
        <CreatePost />
        <Posts feedType={feedType} />
      </div>
    </>
  );
}
