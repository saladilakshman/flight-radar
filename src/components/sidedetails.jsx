import {
  Drawer,
  Typography,
  Stack,
  Box,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Link,
  Button,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { FlightState } from "../App";
import { StyleSheet } from "../styles/style";
import { useGetFlightdetailsQuery } from "../services/flightApi";
// eslint-disable-next-line react/prop-types
export const Sidedetails = ({ drawer, closedrawer }) => {
  const { flightcode } = useContext(FlightState);
  const [receivedcode, setReceivedcode] = useState(flightcode);
  useEffect(() => {
    setReceivedcode(flightcode);
  }, [flightcode]);
  const { isFetching, data, isError } = useGetFlightdetailsQuery(receivedcode);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const breakpoint = mobile ? "body1" : "h6";
  console.log(isFetching, isError, data);
  return (
    <Drawer open={drawer} onClose={() => closedrawer(false)} anchor="left">
      <Box sx={StyleSheet.sidebar}>
        <>
          {isFetching && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                height: "100svh",
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          )}
          {isError && <h6>error...</h6>}
          {data && (
            <>
              <Typography variant="h6" textAlign="center">
                {data?.aircraft?.model?.text}
              </Typography>
              <Typography variant="body1" textAlign="center">
                {data?.aircraft?.model?.code}
              </Typography>
              <Box
                component="img"
                at=""
                src={
                  data?.aircraft?.images?.thumbnails[0].src ??
                  "https://cdn.jetphotos.com/200/6/1124913_1689521210_tb.jpg?v=0"
                }
                sx={StyleSheet.flightImage}
              />
              <Stack
                direction="column"
                alignItems="baseline"
                justifyContent={"center"}
                spacing={1.8}
                sx={StyleSheet.paddings}
              >
                <Typography variant={breakpoint} sx={StyleSheet.font}>
                  Name: {data?.airline?.name ?? "No info available"}
                </Typography>
                <Typography variant={breakpoint} sx={StyleSheet.font}>
                  Reg No: {data?.aircraft?.registration ?? "No info available"}
                </Typography>

                <Stack
                  direction="row"
                  justifyContent="start"
                  alignItems="baseline"
                  spacing={0.8}
                >
                  <Typography variant={breakpoint} sx={StyleSheet.text}>
                    TakeOff:{" "}
                  </Typography>
                  <br />
                  <Link
                    href={data?.airport?.origin?.website ?? "No info available"}
                    sx={{ textDecoration: "none" }}
                  >
                    <Typography variant={mobile ? "body2" : "body1"}>
                      {data?.airport?.origin?.name ?? ""}
                    </Typography>
                  </Link>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="start"
                  alignItems="baseline"
                  spacing={0.8}
                >
                  <Typography variant={breakpoint} sx={StyleSheet.text}>
                    Destination:{" "}
                  </Typography>
                  <br />
                  <Link
                    href={data?.airport?.destination?.website ?? ""}
                    sx={{ textDecoration: "none" }}
                  >
                    <Typography variant={mobile ? "body2" : "body1"}>
                      {data?.airport?.destination?.name ?? ""}
                    </Typography>
                  </Link>
                </Stack>

                <Typography variant={breakpoint} sx={{ fontWeight: 400 }}>
                  Status: {data?.status?.text ?? "No info available"}
                </Typography>
              </Stack>
              <Button
                size="small"
                variant="contained"
                sx={StyleSheet.closebutton}
                fullWidth
                onClick={() => closedrawer(false)}
              >
                Close
              </Button>
            </>
          )}
        </>
      </Box>
    </Drawer>
  );
};
