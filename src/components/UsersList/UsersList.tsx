import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  image: string; // you were using this but never declared it
}

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]); // 🛠️ Add type here
  let [userId, setUserId] = useState<number | null>(null); // 🛠️ Add type here
  let [userData, setUserData] = useState<User | null>(null); // 🛠️ Add type here

  //modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (user: User) => {
    setShow(true);
    setUserId(user.id); // 🛠️ Set the userId when showing the modal
    setUserData(user); // 🛠️ Set the user data when showing the modal
  };

  //end modal

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/users");
      setUsers(response?.data?.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //Delete user function
  let deleteUser = async () => {
    try {
      await axios.delete(`https://dummyjson.com/users/${userId}`);
      // setUserId(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully");
      fetchUsers(); // Refresh the user list after deletion
      handleClose();
    } catch (error) {
      toast.error("Failed to delete user");
      console.error("Error deleting user:", error);
    }
  };

  // add user function
  const navigate = useNavigate();

  return (
    <>
      <div className="container-fluid p-3 mx-1" style={{ width: "78vw" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>UsersList</h3>
          <button
            className="btn btn-warning"
            onClick={() => navigate("/dashboard/addUsers")}
          >
            <i className="bi bi-plus-lg"></i> Add User
          </button>
        </div>
        <hr />
        <div
          style={{ maxHeight: "600px", overflowY: "auto", maxWidth: "100%" }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th></th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Birthdate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <img
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{new Date(user.birthDate).toLocaleDateString()}</td>
                  <td>
                    <AiOutlineEdit
                      className="text-warning mx-3"
                      size={25}
                      onClick={() => navigate(`/dashboard/addUsers/${user.id}`)}
                    />
                    <MdDeleteOutline
                      className="text-danger"
                      size={25}
                      onClick={() => handleShow(user)} // 🛠️ Pass the user to handleShow
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      {/* Modal for adding/editing users can be implemented here */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Are you sure you want to delete ${userData?.firstName}`}</Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-danger"
            variant="secondary"
            onClick={() => deleteUser()} // 🛠️ Ensure userId is not null
          >
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
