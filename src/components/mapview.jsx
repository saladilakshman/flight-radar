import { Box, Typography, Button, Stack } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import plane from "../assets/plane.png";
import { Icon } from "leaflet";
import { StyleSheet } from "../styles/style";
import { useGetAllFlightsQuery, useGetFlightdetailsQuery } from "../services/flightApi";
import travel from "../assets/travel.gif";
import { useState } from "react";
// eslint-disable-next-line react/prop-types
export const MapBox = ({ opendrawer }) => {
    const icon = new Icon({
        iconUrl: plane,
        iconSize: [25, 25],
    });
    const [flightId, setFlightId] = useState(null)
    const { isLoading, data, isError } = useGetAllFlightsQuery();
    const { isLoading: flightload, data: flightdata, } = useGetFlightdetailsQuery(flightId);
    return (
        <Box>
            {isLoading && (
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: "100svh" }}
                >
                    <Box component="img" src={travel} alt="" sx={{ width: 120 }} />
                </Stack>
            )}
            {isError && (
                <Typography variant="h6" textAlign="center">
                    Oops!unexpected error.Try again later
                </Typography>
            )}
            {data && (
                <MapContainer
                    center={[37.09024, -95.712891]}
                    zoom={6}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {data?.aircraft?.map((coordinate, index) => {
                        return (
                            <Marker
                                position={[coordinate[2], coordinate[3]]}
                                key={index}
                                icon={icon}
                            >
                                <Popup>
                                    <Typography variant="body1">
                                        Flight code:{coordinate[9]}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={StyleSheet.mapbutton}
                                        onClick={() => {
                                            setFlightId(coordinate[0])
                                            window.localStorage.setItem("flightinfo", JSON.stringify(flightdata))
                                            opendrawer(true)
                                        }}
                                    >
                                        {flightload ? 'Loading...' : 'Details'}
                                    </Button>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            )}
        </Box>
    );
};
