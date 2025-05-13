import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;

  const sendRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm p-5">
        <figure>
          <img src={photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + " " + gender} </p>}
          <p>{about}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => sendRequest("ignored", _id)}
            >
              Ignore{" "}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => sendRequest("interested", _id)}
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
