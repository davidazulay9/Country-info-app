import React, { useEffect, useState } from "react";
import { Box, List, Sheet, Typography, ListItem, ListItemButton, Card } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCountries = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/countries/`)
                setCountries(response.data);
            }catch(error){
                console.error('Error al obtener los viajes: ', error);
            }
        } 
        fetchCountries();
    },[])

    return (
        <Box sx={{
            backgroundColor: '#F6F6F6',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
        }}>
            <Card sx={{
                backgroundColor: '#28283D',
                display: 'flex',
                alignSelf: 'center',
                flexDirection: 'column',
                width: '100%',
                marginBottom: '2%',
            }}>
                <Typography sx={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    lineHeight: 1.5,
                    color: '#F6F6F6',
                    alignSelf: 'center',
                }}>
                    Country list
                </Typography>
            </Card>
            <Card sx={{
                backgroundColor: '#28283D',
                borderRadius: '10px',
                display: 'flex',
                alignSelf: 'center',
                flexDirection: 'column',
                width: '90%',
                boxSizing: 'border-box',
                paddingBottom: '5%',
            }}>
                <Typography sx={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    lineHeight: 1.5,
                    color: '#F6F6F6',
                    alignSelf: 'left',
                    marginLeft: '5%',
                }}>
                    Select one country
                </Typography>
                {countries.length <= 0 ?
                    <Typography>There are no countries to show</Typography>
                :
                    <Sheet
                        variant="outlined"
                        sx={{
                            backgroundColor: '#F6F6F6',
                            color: '#28283D',
                            width: '90%',
                            maxHeight: 500,
                            alignSelf: 'center',
                            overflow: 'auto', 
                            borderRadius: 'sm' }}
                        >
                        <List>
                            {countries.map((country) => (
                                <ListItem key={country.countryCode}>
                                    <ListItemButton 
                                        onClick={() => navigate(`/details/${country.countryCode}`)}
                                    >
                                        {country.name}
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Sheet>
                }
            </Card>
        </Box>
    )
}

export default Countries;