import React, { useEffect, useState } from "react";
import { Box, Card, List, Sheet, Typography, ListItem, ListItemButton, CircularProgress } from '@mui/joy';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { LineChart } from '@mui/x-charts/LineChart';

const CountriesDetails = () => {
    const [borderCountries, setBorderCountries] = useState([]);
    const [populationData, setpopulationData] = useState([]);
    const [flag, setflag] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { countryId } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchCountries = async () => {
            try{
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/countries/${countryId}`)
                setBorderCountries(response.data.borderCountries);
                setpopulationData(response.data.populationData);
                setflag(response.data.flagUrl);
            }catch(error){
                console.error('Error al obtener los viajes: ', error);
            } finally {
                setIsLoading(false);
            }
        } 
        if (countryId) fetchCountries();
    },[countryId])
    return (
        <Box sx={{
            backgroundColor: '#F6F6F6',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
        }}>
            {isLoading ? (
                // Mostrar CircularProgress mientras se carga
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Card
                        sx={{
                            backgroundColor: "#28283D",
                            display: "flex",
                            alignSelf: "center",
                            flexDirection: "row",
                            width: "100%",
                            marginBottom: "2%",
                            justifyContent: "center",
                        }}
                    >
                        <img src={flag.flag} alt="Country flag" style={{ height: "50px" }} />
                        <Typography
                            sx={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                lineHeight: 1.5,
                                color: "#F6F6F6",
                                alignSelf: "center",
                            }}
                        >
                            {borderCountries.officialName}
                        </Typography>
                        <img src={flag.flag} alt="Country flag" style={{ height: "50px" }} />
                    </Card>
                    <Card
                        sx={{
                            backgroundColor: "#28283D",
                            borderRadius: "10px",
                            display: "flex",
                            alignSelf: "center",
                            flexDirection: "column",
                            width: "90%",
                            boxSizing: "border-box",
                            paddingBottom: '5%',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                lineHeight: 1.5,
                                color: "#F6F6F6",
                                alignSelf: "left",
                                marginLeft: "5%",
                            }}
                        >
                            Border countries
                        </Typography>
                        {borderCountries.borders.length <= 0 ? (
                            <Typography>There are no countries to show</Typography>
                        ) : (
                            <Sheet
                                sx={{
                                    backgroundColor: "#F6F6F6",
                                    color: "#28283D",
                                    width: "90%",
                                    maxHeight: 500,
                                    alignSelf: "center",
                                    overflow: "auto",
                                    borderRadius: "sm",
                                }}
                            >
                                <List>
                                    {borderCountries.borders.map((country) => (
                                        <ListItem key={country.countryCode}>
                                            <ListItemButton onClick={() => navigate(`/details/${country.countryCode}`)}>
                                                {country.commonName}
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Sheet>
                        )}
                    </Card>
                    <Card
                        sx={{
                            backgroundColor: "#28283D",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            alignSelf: "center",
                            flexDirection: "column",
                            width: "90%",
                            boxSizing: "border-box",
                            padding: "5%",
                            justifyContent: "center",
                            marginTop: "2%",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                lineHeight: 1.5,
                                color: "#F6F6F6",
                                alignSelf: "center",
                                marginLeft: "5%",
                            }}
                        >
                            Population Over the Years
                        </Typography>
                        {populationData.populationCounts.length <= 0 ? (
                            <Typography sx={{ color: "#F6F6F6" }}>
                                There are no population data to show
                            </Typography>
                        ) : (
                            <LineChart
                                xAxis={[
                                    {
                                        data: populationData.populationCounts.map((data) => data.year),
                                        label: "Year",
                                    },
                                ]}
                                yAxis={[
                                    {
                                        data: populationData.populationCounts.map((data) => data.value),
                                    },
                                ]}
                                series={[
                                    {
                                        data: populationData.populationCounts.map((data) => data.value),
                                        label: "Population Growth",
                                    },
                                ]}
                                width={1200}
                                height={400}
                                sx={{
                                    backgroundColor: '#F6F6F6',
                                    alignSelf: "center",
                                    marginTop: "20px",
                                }}
                            />
                        )}
                    </Card>
                </>
            )}
        </Box>
    );
};

export default CountriesDetails;