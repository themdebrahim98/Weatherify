import logo from "./logo.svg";
import React, { useState } from "react";
import axios from "axios";

import "./App.css";
import Nav from "./components/Nav";
import { Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Container } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Button, Stack, Paper } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import rainImage from "./media/rain.jpeg";
import CardItem from "./components/CardItem";
import { styled } from "@mui/material/styles";

const StyledBox = styled("div")(({ theme }) => {
  console.log(theme);
  return {
    elevation: "5px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    height: "250px",
    padding: "5px",
    width: "350px",
    padding: "40px",
    borderRadius: "15px",
    //  backgroundImage: `url(${rainImage})`,
    border: "1px solid gray",
    color: "text.primary",
    background: `${theme.palette.primary.main}`,
    boxShadow: `${theme.shadows[21]}`,
    margin: "auto",
    alignItems: "center",
  };
});

 function App() {

    
    const [city, setcity] = useState('')
    const [weatherInfo, setweatherInfo] = useState({
        temp:null,
        pressure:null,
        humidity:null,
        description:null,
        state:null,
        country:null,
        windSpeed:null

    
    })
    let feature = ["Humidity", "Percipitation", "Pressure", "Feels Like"];
    const handleSearch = async(e) => {
        if (e.keyCode === 13) {
        e.preventDefault();
        let response1 = await axios(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=9b52a325f3d891ddfd5c0ceafa5dfa1f`)
     console.log(response1)
     if(response1.data.length>0){

         let response2 = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${+(response1.data[0].lat)}&lon=${+(response1.data[0].lon)}&units=metric&appid=9b52a325f3d891ddfd5c0ceafa5dfa1f`)
         console.log(response2.data)
     }

        }
        
    };

  return (
    <Container>
      <Nav />

      <Paper
        elevation={5}
        sx={{
          margin: "auto",
          marginTop: "100px",
          textAlign: "center",
          padding: "45px",
          height: { xs: "auto" },
        }}
      >
        <Stack
          direction="row"
          spacing={0}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "50px",
          }}
        >
          <TextField
          onChange ={(e)=>setcity((e.target.value).toLowerCase())}
            autoFocus={true}
            color="primary"
            variant="standard"
            sx={{ width: "350px" }}
            size="string"
            onKeyUp={handleSearch}
            id="input-with-icon-textfield"
            placeholder="Enter City Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="secondary" />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack sx={{ display: "bolck" }}>
          <StyledBox elevation={4} style={{}} id="styleBox">
            <Stack spacing={2} direction="column" color="">
              <Typography variant="h5" sx={{ fontWeight: "700" }}>
                {" "}
                West Bengal
              </Typography>
              <Typography variant="h2">
                35<sup style={{ fontSize: "40px" }}>o</sup>
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "500" }}>
                {" "}
                Clear Sky
              </Typography>
            </Stack>
          </StyledBox>

          <Grid
            container
            spacing={{ xs: 2, md: 1 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            justifyContent="center"
          >
            {feature.map((item, index) => (
              <Grid item key={index}>
                <CardItem title={item} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Paper>
    </Container>
  );
}

export default App;
