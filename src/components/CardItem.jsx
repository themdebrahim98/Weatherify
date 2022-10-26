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
  height:'175px', 
  mt: "50px",
  background: `${theme.palette.primary.light}`,
  marginTop:'45px',
  borderRadius:'15px',
  boxShadow:`${theme.shadows[21]}`,
}));

export default function CardItem({ title }) {
  return (
    <StyledCard >
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
          {title}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
       
      </CardContent>
    </StyledCard>
  );
}
