import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, TextField, List, ListItem, ListItemText, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);

      const storedItems = localStorage.getItem(`items_${storedUser}`);
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }

    } else {
      navigate("/login");
    }
  }, [navigate]);

  const addItem = () => {
    if (newItem.trim() === "") return;
    const newItemObj = { id: Date.now(), name: newItem };
    const updatedItems = [...items, newItemObj];
    setItems(updatedItems);
    setNewItem("");

    localStorage.setItem(`items_${user}`, JSON.stringify(updatedItems));
  };

  const updateItem = (id, newName) => {
    const updatedItems = items.map(item => (item.id === id ? { ...item, name: newName } : item));
    setItems(updatedItems);

    // Save updated items to localStorage
    localStorage.setItem(`items_${user}`, JSON.stringify(updatedItems));
  };

  const deleteItem = (id) => {
    const updateItems = items.filter(item => item.id !== id);
    setItems(updateItems);

    localStorage.setItem(`items_${user}`, JSON.stringify(updatedItems));

  };

  return (
    <Container maxWidth="xs">
      <Box 
        sx={{ 
          textAlign: "center", 
          p: 3, 
          borderRadius: 2, 
          boxShadow: 3, 
          backgroundColor: "#f9f9f9", 
          mt: 5 // Adds some margin at the top
        }}
      >
        <Typography variant="h4" sx={{ color: "#333", mb: 2 }}>
          Welcome {user}
        </Typography>
        <TextField
          label="New Item"
          fullWidth
          margin="normal"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          variant="outlined"
          sx={{ backgroundColor:  "white" }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={addItem}
          sx={{ mt: 2, borderRadius: "8px", textTransform: "none" }}
        >
          Add Item
        </Button>
        <ul style={{ padding: 0, listStyle: "none" }}>
        {items.map(item => (
          <li key={item.id} style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
            <TextField
              fullWidth
              value={item.name}
              onChange={(e) => updateItem(item.id, e.target.value)}
              sx={{ marginRight: '10px', borderRadius: '4px' }}
            />
            <Button variant="contained" color="secondary" onClick={() => deleteItem(item.id)} style={{ marginLeft: "10px", backgroundColor: '#202123', '&:hover': { backgroundColor: '#c51162' } }}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth 
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            navigate("/login");
          }}
          sx={{ mt: 2, borderRadius: "10px", textTransform: "none" }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;