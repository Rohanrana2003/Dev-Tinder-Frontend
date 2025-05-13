import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender | "");
  const [age, setAge] = useState(user.age | "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl | "");
  const [about, setAbout] = useState(user.about | "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const updateProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "profile/edit",
        { firstName, lastName, age, gender, photoUrl, about },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="p-10  flex justify-center  ">
          <div className="card card-dash bg-base-300 w-96">
            <div className="card-body">
              <h2 className="card-title justify-center">Login</h2>
              <div>
                <fieldset className="fieldset ">
                  <legend className="fieldset-legend">FirstName</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset ">
                  <legend className="fieldset-legend">LastName</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset ">
                  <legend className="fieldset-legend">Gender</legend>
                  <input
                    type="text"
                    className="input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset ">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    className="input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset ">
                  <legend className="fieldset-legend">About</legend>
                  <input
                    type="text"
                    className="input"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset ">
                  <legend className="fieldset-legend">PhotoURL</legend>
                  <input
                    type="text"
                    className="input"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary mt-2"
                  onClick={updateProfile}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard user={user} />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Updated successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
