import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  console.log(feed);

  const getFeed = async () => {
    if (feed) return;
    const res = await axios.get(BASE_URL + "feed", { withCredentials: true });
    dispatch(addFeed(res.data.data));
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (feed?.length === 0)
    return (
      <h1 className="text-3xl text-center font-semibold my-10">
        No data in feed
      </h1>
    );
  return (
    feed && (
      <div className="flex justify-center m-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
