import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "../../assets/Dashboard.css";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [runUseState, setRun] = useState(0);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/user/show")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [runUseState]);

  //   useEffect(() => {
  //     fetch("http://127.0.0.1:8000/api/user/showbyid/1")
  //       .then((res) => res.json())
  //       .then((data) => console.log(data));
  //   }, []);

  // async function deleteUser(id) {
  //   try {
  //     const res = await axios.delete(
  //       `http://127.0.0.1:8000/api/user/delete/${id}`
  //     );
  //     if (res.status === 200) {
  //       setRun((prev) => prev + 1);
  //     }
  //   } catch {
  //     console.log("none");
  //   }
  // }



  const showNumOfUsers = users.length
  

  const showUsers = users.map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.created_at.substr(0,10)}</td>
      <td className="icons">
        <Link to={`${user.id}`}>
          <FontAwesomeIcon className="update" icon={faPenToSquare} />
        </Link>
        {/* <FontAwesomeIcon
          className="delete"
          onClick={() => deleteUser(user.id)}
          icon={faTrash}
        /> */}
      </td>
    </tr>
  ));
  return (
    <div className="body7">
      <div className="numOfUsers">
        Num of users :<span>{showNumOfUsers}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Users</th>
            <th>Email</th>
            <th>Created at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showUsers}</tbody>
      </table>
    </div>
  );
}
