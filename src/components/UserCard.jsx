const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoUrl } = user;
  console.log(user);
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
            <button className="btn btn-primary">Ignore </button>
            <button className="btn btn-secondary">Send Request</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
