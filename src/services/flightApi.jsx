import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY } from "../secretkey";
export const flightApi = createApi({
    baseQuery: fetchBaseQuery({
        reducerPath: "flight-api",
        baseUrl: "https://flight-radar1.p.rapidapi.com/flights",
        prepareHeaders(headers) {
            headers.set(
                "X-RapidAPI-Key",
                API_KEY
            ),
                headers.set("X-RapidAPI-Host", "flight-radar1.p.rapidapi.com");
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAllFlights: builder.query({
            query: () =>
                "/list-in-boundary?bl_lat=-90&bl_lng=-180&tr_lat=90&tr_lng=180&limit=300",
        }),
        getFlightdetails: builder.query({
            query: (coordinate) => `/detail?flight=${coordinate}`,
        }),
    }),
});
export const { useGetAllFlightsQuery, useGetFlightdetailsQuery } = flightApi;
