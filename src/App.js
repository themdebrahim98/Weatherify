import logo from "./logo.svg";
import React, { useState } from "react";
import axios from "axios";

import "./App.css";
import Nav from "./components/Nav";
import { Card, Grid, InputBase, Typography } from "@mui/material";
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
import { Block } from "@mui/icons-material";

const StyledBox = styled("div")(({ theme }) => {
  console.log(theme);
  return {
    elevation: "5px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    height: "280px",
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
  const [city, setcity] = useState("");
  const [weatherInfo, setweatherInfo] = useState({});
  let feature = [
    "Humidity",
    "Cloudiness",
    "Pressure",
    "Feels Like",
    "Visibility",
    "Wind Speed",
    "Sea Level",
  ];
  const handleSearch = async (e) => {
    console.log(e.target);
    if (e.keyCode === 13 || e.target.id == "searchButton") {
      e.preventDefault();
      let response1 = await axios(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=9b52a325f3d891ddfd5c0ceafa5dfa1f`
      );
      console.log(response1);
      if (response1.data.length > 0) {
        let response2 = await axios(
          `https://api.openweathermap.org/data/2.5/weather?lat=${+response1
            .data[0].lat}&lon=${+response1.data[0]
            .lon}&units=metric&appid=9b52a325f3d891ddfd5c0ceafa5dfa1f`
        );
        console.log(response2.data);
        let fetchData = response2.data;

        setweatherInfo([
          {
            title: "temp",
            temp: fetchData.main.temp,
            state: response1.data[0].state,
            description: fetchData.weather[0].description,
            temp_min: fetchData.main.temp_min,
            temp_max: fetchData.main.temp_max,
            country: fetchData.sys.country,
          },
          {
            title: "humidity",
            humidity: fetchData.main.humidity,
          },
          {
            title: "cloudiness",
            clouds: fetchData.clouds.all,
          },
          {
            title: "pressure",
            pressure: fetchData.main.pressure,
          },
          {
            title: "feels like",
            feels_like: fetchData.main.feels_like,
          },
          {
            title: "visibility",
            visibility: fetchData.visibility,
          },
          {
            title: "wind speed",
            wind_speed: fetchData.wind.speed,
          },
          {
            title: "sunrise sunset",
            sunrise: fetchData.sys.sunrise,
            sunset: fetchData.sys.sunset,
          },
          { title: "sea level", sea_level: fetchData.main.sea_level },
        ]);
      } else {
        setweatherInfo({});
        alert("Please Enter Correct Name");
      }
    }
  };

  return (
    <Container>
      {console.log(weatherInfo)}
      <Nav />

      <Paper
        elevation={5}
        sx={{
          background: 'linear-gradient(145deg, #1565c0, transparent)',
          margin: "auto",
          marginTop: "100px",
          textAlign: "center",
          padding: "45px",
          height: { xs: "100%" },
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
          <Box
            sx={{
              width: "350px",
              height: "50px",
              background: "whitesmoke",
              display: "flex",
              padding: "5px",
            }}
          >
            <InputBase
              autoFocus={true}
              onKeyUp={handleSearch}
              onChange={(e) => setcity(e.target.value.toLowerCase())}
              sx={{ flex: 4 }}
              placeholder="Enter City Name..."
            >
              <TextField
                autoFocus={true}
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
            </InputBase>
            <Button
              id="searchButton"
              onClick={handleSearch}
              sx={{ flex: 1 }}
              variant="contained"
            >
              Search
            </Button>
          </Box>
        </Stack>
        {console.log(city)}
        {Object.keys(weatherInfo).length > 0 && (
          <Stack>
            <StyledBox elevation={4} style={{}} id="styleBox">
              <Stack spacing={2} direction="column" color="">
                <Typography variant="h5" sx={{ fontWeight: "700" }}>
                  {weatherInfo[0].state}
                  <sup style={{ marginLeft: "5px", color: "whitesmoke" }}>
                    {weatherInfo[0].country}
                  </sup>
                </Typography>
                <Typography variant="h2">
                  {weatherInfo[0].temp}
                  <sup style={{ fontSize: "40px" }}>o</sup>
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: "500" }}>
                  {weatherInfo[0].description}
                </Typography>
                <Stack direction='row' spacing={5}>
                <Typography variant="body1" sx={{ fontWeight: "500" }}>
                 H:{weatherInfo[0].temp_max}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "500" }}>
                  L: {weatherInfo[0].temp_min}
                </Typography>

                </Stack>
                
              </Stack>
            </StyledBox>

            <Grid
              container
              spacing={{ xs: 2, md: 1 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              justifyContent="center"
            >
              {feature.map((item, index) => {
                let filterData = weatherInfo.filter(
                  (elm) => elm.title.toLowerCase() == item.toLocaleLowerCase()
                );
                return (
                  <Grid item key={index}>
                    <CardItem data={filterData} tit />
                  </Grid>
                );
              })}
            </Grid>
          </Stack>
        )}
      </Paper>
    </Container>
  );
}

export default App;
