import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledCard = styled("div")(({ theme }) => ({
  width: "175px",
  height: "175px",
  mt: "50px",
  background: `${theme.palette.primary.light}`,
  marginTop: "45px",
  borderRadius: "15px",
  boxShadow: `${theme.shadows[21]}`,
}));

export default function CardItem({ data }) {
  return (
    <StyledCard>
      {console.log(data[0].title, "data")}
      <CardContent>
        <Typography
          borderBottom={1}
          borderColor="secondary.main"
          sx={{
            fontSize: 14,
            fontWeight: "500",
            letterSpacing: "2px",
            textTransform: "upperCase",
          }}
          color="text.primary"
          gutterBottom
        >
          {data && data[0].title}
        </Typography>

        <Typography variant="contained"  component='Button'  sx={{ mt: 1.5,p:'12px',fontSize:'20px',fontWeight:'700' }} color="text.secondary">
          {data[0].humidity && `${data[0].humidity} %`}
          {data[0].clouds && `${data[0].clouds } %`}
          {data[0].pressure && `${data[0].pressure} hpa`} 
          {data[0].feels_like && `${data[0].feels_like} (c)`} 
          {data[0].visibility && `${data[0].visibility/1000} km` }
          {data[0].wind_speed && `${data[0].wind_speed} m/s`} 
          {data[0].sea_level && `${data[0].sea_level} hpa`} 
          
        </Typography>
      </CardContent>
    </StyledCard>
  );
}
