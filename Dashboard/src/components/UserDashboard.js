import React, { useState, useEffect } from "react";
import { Container, Table, Form, Card, Spinner } from "react-bootstrap";

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Indian user data from API
  useEffect(() => {
    fetch("https://randomuser.me/api/?nat=in&results=100")
      .then((response) => response.json())
      .then((data) => {
        // Transform API response into a structured format
        const formattedUsers = data.results.map((user, index) => ({
          id: index + 1,
          name: `${user.name.first} ${user.name.last}`,
          username: user.login.username,
          email: user.email,
          phone: user.phone,
        }));
        setUsers(formattedUsers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  // Filter users based on search input
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow">
        <h2 className="text-center mb-3">User Dashboard</h2>

        {/* Search Bar */}
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search users by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>

        {/* Loader */}
        {loading ? (
          <div className="text-center mt-3">
            <Spinner animation="border" variant="primary" />
            <p>Loading users...</p>
          </div>
        ) : (
          <Table striped bordered hover responsive className="mt-3">
            <thead className="bg-dark text-white">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
};

export default UserDashboard;
