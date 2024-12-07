import React, { useEffect, useState } from "react";
import filter from "../assets/filter.png";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  TextField,
  InputAdornment,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AddSubCategoryModal from "./AddSubCategoryModal";

const SubCategoriesPage = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this sub-category?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/subcategories/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setSubCategories((prevCategories) =>
            prevCategories.filter((category) => category.id !== id)
          );
          alert("Sub-category deleted successfully.");
        } else {
          alert("Failed to delete the sub-category.");
        }
      } catch (error) {
        console.error("Error deleting sub-category:", error);
        alert("An error occurred while deleting the sub-category.");
      }
    }
  };
  const fetchMenuData = async () => {
    const response = await fetch("http://localhost:5000/subcategories");
    const data = await response.json();
    setSubCategories(data);
  };

  const handleSort = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };
  const handleResetSort = () => {
    setSortOrder("asc");
  };

  const handleAddSubCategory = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitSubCategory = () => {
    fetchMenuData();
  };

  const filteredCategories = subCategories.filter(
    (category) =>
      category.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.subCategoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCategories = filteredCategories.sort((a, b) => {
    if (a.id < b.id) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (a.id > b.id) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  useEffect(() => {
    fetchMenuData();
  }, []);

  return (
    <Box
      display="flex"
      sx={{
        p: 0,
        m: 0,
        border: "none",
        boxShadow: "none",
        backgroundColor: "#F9F9F9",
      }}
    >
      <Sidebar />
      <Box flex="1">
        <Navbar />

        <Box mt={10} sx={{ boxShadow: "none" }}>
          <Card sx={{ boxShadow: "none", backgroundColor: "#F9F9F9" }}>
            <CardHeader
              sx={{ p: 0, paddingX: "16px" }}
              title={
                <Typography
                  variant="h8"
                  sx={{ color: "grey", fontSize: "0.8rem" }}
                >
                  Sub-categories
                </Typography>
              }
            />
            <CardHeader
              title={
                <Typography variant="h6" fontWeight="bold">
                  All Sub-categories
                </Typography>
              }
            />
            <CardContent
              sx={{ backgroundColor: "#F9F9F9", paddingRight: "3rem" }}
            >
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Box display="flex" alignItems={"center"}>
                  <TextField
                    sx={{
                      minWidth: "600px",
                      height: "4em",
                    }}
                    variant="outlined"
                    placeholder="Search via name, mobile number or email ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  gap={"10px"}
                  alignItems={"center"}
                >
                  <img
                    height={40}
                    src={filter}
                    alt="filter"
                    onClick={handleSort}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddSubCategory}
                    sx={{
                      backgroundColor: "#3F59A3",
                      maxHeight: "40px",
                    }}
                  >
                    + Add New Sub-category
                  </Button>
                </Box>
                <AddSubCategoryModal
                  subCategories={subCategories}
                  open={showModal}
                  onClose={handleCloseModal}
                  onSubmit={handleSubmitSubCategory}
                />
              </Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                      <TableCell
                        style={{
                          width: "50px",
                          fontSize: "0.8rem",
                          backgroundColor: "#F9F9F9",
                          color: "grey",
                        }}
                        onClick={handleResetSort}
                      >
                        S.No.
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "0.8rem",
                          backgroundColor: "#F9F9F9",
                          color: "grey",
                          width: "289px",
                        }}
                      >
                        Category name
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "0.8rem",
                          backgroundColor: "#F9F9F9",
                          color: "grey",
                        }}
                      >
                        Sub-category name
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          fontSize: "0.8rem",
                          backgroundColor: "#F9F9F9",
                          color: "grey",
                        }}
                      >
                        Option
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedCategories.map((category, index) => (
                      <TableRow
                        key={category.id}
                        sx={{
                          backgroundColor:
                            index % 2 === 0 ? "#f9f9f9" : "#f1f1f1",
                        }}
                      >
                        <TableCell>{category.id}.</TableCell>
                        <TableCell>{category.categoryName}</TableCell>
                        <TableCell>{category.subCategoryName}</TableCell>
                        <TableCell align="right">
                          <IconButton size="small">
                            <svg
                              width="22"
                              height="19"
                              viewBox="0 0 22 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.33317 14.1036L1.1665 18.4369L5.83317 17.3536L19.3502 4.80206C19.7876 4.39575 20.0333 3.84475 20.0333 3.27023C20.0333 2.69571 19.7876 2.14471 19.3502 1.7384L19.1495 1.55206C18.7119 1.14588 18.1186 0.917694 17.4998 0.917694C16.8811 0.917694 16.2877 1.14588 15.8502 1.55206L2.33317 14.1036Z"
                                stroke="#3F59A3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M2.33317 14.1026L1.1665 18.4359L5.83317 17.3526L17.4998 6.51926L13.9998 3.26926L2.33317 14.1026Z"
                                fill="#3F59A3"
                              />
                              <path
                                d="M13.9998 3.26926L17.4998 6.51926M11.6665 18.4359H20.9998"
                                stroke="#3F59A3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(category.id)}
                          >
                            <svg
                              width="29"
                              height="27"
                              viewBox="0 0 29 27"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.78571 21.6239C6.78571 22.8461 7.94286 23.8461 9.35714 23.8461H19.6429C21.0571 23.8461 22.2143 22.8461 22.2143 21.6239V8.29058H6.78571V21.6239ZM9.94857 13.7128L11.7614 12.1461L14.5 14.5017L17.2257 12.1461L19.0386 13.7128L16.3129 16.0684L19.0386 18.4239L17.2257 19.9906L14.5 17.635L11.7743 19.9906L9.96143 18.4239L12.6871 16.0684L9.94857 13.7128ZM19 4.95724L17.7143 3.84613H11.2857L10 4.95724H5.5V7.17946H23.5V4.95724H19Z"
                                fill="#FF5252"
                              />
                            </svg>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
export default SubCategoriesPage;
