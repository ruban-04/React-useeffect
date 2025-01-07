
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function Datastorage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://672863f4270bd0b975553389.mockapi.io/cruddata/RegisterForm"
        );
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (row) => {
    navigate("/Register", { state: { rowData: row } });
  };

  const handleDelete = async (id) => {
    try {
      await fetch(
        `https://672863f4270bd0b975553389.mockapi.io/cruddata/RegisterForm/${id}`,
        {
          method: "DELETE",
        }
      );
      setData(data.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "rgb(43, 43, 43)",
        height: "100vh",
        paddingTop: "3rem",
      }}
    >
      <TableContainer
        component={Paper}
        style={{ marginLeft: "15%", maxWidth: "80%", marginRight: "15%" }}
      >
        <Table>
          <TableHead style={{ backgroundColor: "rgb(30, 30, 47)" }}>
            <TableRow>
              <TableCell style={{ color: "white", textAlign: "center" }}>ID</TableCell>
              <TableCell style={{ color: "white", textAlign: "center" }}>Firstname</TableCell>
              <TableCell style={{ color: "white", textAlign: "center" }}>Lastname</TableCell>
              <TableCell style={{ color: "white", textAlign: "center" }}>Email</TableCell>
              <TableCell style={{ color: "white", textAlign: "center" }}>Mobile</TableCell>
              {/* <TableCell style={{ color: "white", textAlign: "center" }}>Password</TableCell> */}
              {/* <TableCell style={{ color: "white", textAlign: "center" }}>
                Confirm Password
              </TableCell> */}
              <TableCell style={{ color: "white", textAlign: "center" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell style={{ color: "black", textAlign: "center" }}>{row.id}</TableCell>
                <TableCell style={{ color: "black", textAlign: "center" }}>{row.firstname}</TableCell>
                <TableCell style={{ color: "black", textAlign: "center" }}>{row.lastname}</TableCell>
                <TableCell style={{ color: "black", textAlign: "center" }}>{row.email}</TableCell>
                <TableCell style={{ color: "black", textAlign: "center" }}>{row.mobile}</TableCell>
                {/* <TableCell style={{ color: "black", textAlign: "center" }}>{row.password}</TableCell> */}
                {/* <TableCell style={{ color: "black", textAlign: "center" }}>
                  {row.confirmpassword}
                </TableCell> */}
                <TableCell style={{ textAlign: "center" }}>
                  <IconButton
                    onClick={() => handleEdit(row)}
                    style={{ color: "green" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(row.id)}
                    style={{ color: "red" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Datastorage;
