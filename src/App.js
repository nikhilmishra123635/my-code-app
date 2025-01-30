import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {

    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", city: "", zipcode: "" });

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
          .then((res) => res.json())
          .then((data) => {
            const formattedData = data.map(user => ({
              id: user.id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              city: user.address.city,
              zipcode: user.address.zipcode
            }));
            setUsers(formattedData);
          });
      }, []);
    
      const handleDelete = (id) => {
        setUsers(users.filter((user) => user.id !== id));
      };
    
      const handleEdit = (user) => {
        setEditUser(user);
        setFormData(user);
        setShow(true);
      };
    
      const handleClose = () => {
        setShow(false);
        setEditUser(null);
      };
    
      const handleSave = () => {
        if (editUser) {
          setUsers(users.map((user) => (user.id === editUser.id ? formData : user)));
        } else {
          setUsers([...users, { ...formData, id: users.length + 1 }]);
        }
        setShow(false);
      };
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

  return (
  <div className="container mt-5">
          <h1> !! Dreamcast Code Camp !!</h1>
      <h2>User Records</h2>
      <Button variant="primary" onClick={() => { setFormData({ name: "", email: "", phone: "", city: "", zipcode: "" }); setShow(true); }}>Add User</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City (Zip Code)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.city} ({user.zipcode})</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(user)}>Edit</Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editUser ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSave}>{editUser ? "Save Changes" : "Add User"}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
