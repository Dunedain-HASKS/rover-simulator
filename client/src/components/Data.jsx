import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));




const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, value) {
  return { name, value };
}

const rows = [
  createData('Row', 159),
  createData('Pitch', 237),
  createData('X', 262),
  createData('Longitude', 305),
  createData('Latitude', 356),
];

export default function Data() {

const [roverData, setRoverData] = useState();

useEffect(() => {
  fetch("http://localhost:8000/api/rover/latest")
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setRoverData(data);})
    .catch((error) => console.log("Error: ", error));
}, []);

  return (
    <TableContainer sx={{ height: "48vh" }} component={Paper}>
      <Table sx={{ minWidth: "100%" }} aria-label="customized table">
        <TableHead sx={{ width: "100%" }}>
          <TableRow sx={{ width: "100%" }}>
            <StyledTableCell sx={{ width: "100%" }}>
              Live Data
            </StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{width:"100%"}}>
          {roverData && roverData.map((row) => (
            <div key={row.name} style={{width:"100%"}}>
              <StyledTableRow sx={{width:"100%" , display: "flex"}}>
                <StyledTableCell component="th" scope="row" sx={{width:"100%"}}>
                  Latitude
                </StyledTableCell>
                <StyledTableCell align="right" sx={{width:"100%"}}>{row.latitude}</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow sx={{width:"100%"}}>
                <StyledTableCell component="th" scope="row" sx={{width:"100%"}}>
                  Longitude
                </StyledTableCell>
                <StyledTableCell align="right" sx={{width:"100%"}}>{row.longitude}</StyledTableCell>
              </StyledTableRow>
            </div>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
