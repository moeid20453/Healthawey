import React, { useState, useEffect } from "react";
import "../../assets/Dashboard.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchUsers();
  }, []); // Fetch users on component mount

  const fetchUsers = () => {
    fetch("http://localhost:4500/Admin/User/AllUsers")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data from server:", data); // Log data to inspect its structure
        if (data && Array.isArray(data.user)) {
          setUsers(data.user); // Update users state with fetched data
        } else {
          throw new Error("Invalid data format");
        }
        setLoading(false); // Update loading state when fetch is done
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false); // Ensure loading state is updated on error
      });
  };

  const handleDeleteUser = (userId) => {
    fetch(`http://localhost:4500/Admin/User/delete/${userId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete user");
        }
        // Remove the deleted user from the users state
        setUsers(users.filter((user) => user._id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        // Handle error deleting user
      });
  };

  if (loading) {
    return <p>Loading...</p>; // Render a loading indicator
  }

  if (!Array.isArray(users) || users.length === 0) {
    return <p>No users found</p>; // Render a message if no users or not an array
  }

  const showUsers = users.map((user, index) => (
    <tr key={index}>
      <td>{user._id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.age}</td>
      <td>{user.weight}</td>
      <td>{user.height}</td>
      <td>{user.gender}</td>
      <td>
        <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
      </td>
    </tr>
  ));

  return (
    <div className="body7">
      <div className="numOfUsers">
        Num of users: <span>{users.length}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Weight</th>
            <th>Height</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showUsers}</tbody>
      </table>
    </div>
  );
}
