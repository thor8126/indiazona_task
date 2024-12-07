import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

const AddSubCategoryModal = ({ open, onClose, onSubmit }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchMenuData = async () => {
      const response = await fetch("http://localhost:5000/subcategories");
      const data = await response.json();
      console.log(response);
      setCategories(data);
    };
    fetchMenuData();
  }, []);
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubCategoryNameChange = (event) => {
    setSubCategoryName(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedCategory || !subCategoryName) {
      return;
    }

    setIsLoading(true);
    try {
      // POST request to add a new sub-category
      const response = await fetch("http://localhost:5000/subcategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryName: selectedCategory,
          subCategoryName: subCategoryName,
        }),
      });

      if (response.ok) {
        onSubmit();
        onClose();
      } else {
        console.error("Error adding sub-category:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding sub-category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-subcategory-modal-title"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 660,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="add-subcategory-modal-title"
          variant="h6"
          component="h2"
          align="center"
          gutterBottom
        >
          Add new sub category
        </Typography>
        <FormControl fullWidth margin="normal">
          <Typography variant="body1" gutterBottom>
            Category *
          </Typography>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            displayEmpty
            inputProps={{ "aria-label": "Select category" }}
          >
            <MenuItem value="" disabled>
              Select from dropdown
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.categoryName}>
                {category.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box mt={2}>
          <Typography variant="body1" gutterBottom>
            Sub-category Name *
          </Typography>
          <TextField
            fullWidth
            placeholder="Write sub-category name here"
            value={subCategoryName}
            onChange={handleSubCategoryNameChange}
          />
        </Box>
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isLoading}
            sx={{
              width: 126,
              height: 40,
              bgcolor: "#3F59A3",
              "&:hover": {
                bgcolor: "#3F59A3",
              },
            }}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddSubCategoryModal;
