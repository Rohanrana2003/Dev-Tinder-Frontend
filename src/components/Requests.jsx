/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    setError(null);
    try {
      const res = await axios.get(BASE_URL + "user/requests/received", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err.status);
      if (err.status === 400) setError("No Requests");
    }
  };

  const reviewRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests)
    return (
      <h1 className="text-3xl text-center font-semibold my-10">{error}</h1>
    );

  return (
    <div className="flex flex-col items-center m-10">
      <h1 className="text-3xl font-semibold mb-10">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, age, gender, about, photoUrl } =
          request.fromUserId;

        return (
          <div
            className="flex justify-between items-center gap-5 mb-5 bg-base-300 p-5 rounded-lg w-1/2"
            key={_id}
          >
            <div>
              <img className="w-24 rounded-lg" src={photoUrl} alt="photo" />
            </div>
            <div>
              <p className="font-bold text-xl">{firstName + " " + lastName}</p>
              {age && gender && <p>{age + ", " + gender} </p>}
              <p>{about}</p>
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequests("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequests("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
