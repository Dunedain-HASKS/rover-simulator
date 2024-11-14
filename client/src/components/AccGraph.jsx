import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import "./scroll.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function AccSimpleLineChart() {
  const [roverData, setRoverData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:8000/api/accData/latest3")
        .then((res) => res.json())
        .then((data) => {
          // console.log("Data received for table after 3 seconds", data);
          setRoverData(data);
        })
        .catch((error) => console.log("Error: ", error));
    };
    fetchData();

    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, []);

  // Extract latitude, longitude, and timestamps from roverData
  const x = roverData.map((item) => item.x);
  const y = roverData.map((item) => item.y);
  const z = roverData.map((item) => item.z);
  const timestamps = roverData.map(
    (item) => item.timestamp.split("T")[1].split(".")[0]
  );

  return (
    <TableContainer
      className="custom-scroll-container"
      sx={{ height: "48vh" }}
      component={Paper}
    >
      <Table sx={{ minWidth: "100%" }} aria-label="customized table">
        <TableHead sx={{ width: "100%" }}>
          <TableRow sx={{ width: "100%" }}>
            <StyledTableCell sx={{ width: "100%" }}>
              Latest 10 Accelerometer Data
            </StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody
          className="custom-scroll-container"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "cemter",
            alignItems: "center",
            msOverflowY: "auto",
          }}
        >
          <LineChart
            width={620} // Initial width of the chart
            height={280} // Initial height of the chart
            series={[
              { data: x, label: "x", id: "x" },
              { data: y, label: "y", id: "y" },
              { data: z, label: "z", id: "z" },
            ]}
            xAxis={[
              { data: timestamps, scaleType: "band" }, // Set scaleType to 'band'
            ]}
            options={{
              animation: false, // Disable animation for responsiveness
            }}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
