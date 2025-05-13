import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1> No Connection Found</h1>;

  return (
    <div className="flex flex-col items-center m-10">
      <h1 className="text-3xl font-semibold mb-10">Connections</h1>

      {connections.map((connection) => {
        const { firstName, lastName, age, gender, about, photoUrl } =
          connection;

        return (
          <div className="flex gap-5 bg-base-300 p-5 rounded-lg w-1/3">
            <div>
              <img className="w-24 rounded-lg" src={photoUrl} alt="photo" />
            </div>
            <div>
              <p className="font-bold text-xl">{firstName + " " + lastName}</p>
              {age && gender && <p>{age + ", " + gender} </p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
