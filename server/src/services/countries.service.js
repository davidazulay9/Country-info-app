import axios from 'axios';

const getAllCountries = async () => {
    try{
        const countries = await axios.get(process.env.COUNTRIES_LIST);
        return countries.data;
    }catch(error){
        throw new Error(error.message);
    }
}

const getBorderCountries = async (countryId) => {
    try{
        const countries = await axios.get(process.env.BORDER_COUNTRIES + countryId);
        return countries.data;
    }catch(error){
        throw new Error(error.message);
    }
}

const getPopulationData = async () => {
    try{
        const population = await axios.get(process.env.POPULATION_DATA);
        return population.data;
    }catch(error){
        throw new Error(error.message);
    }
}

const getFlagUrl = async () => {
    try{
        const flag = await axios.get(process.env.FLAG_URL);
        return flag.data;
    }catch(error){
        throw new Error(error.message);
    }
}

export const countriesService = {
    getAllCountries,
    getBorderCountries,
    getPopulationData,
    getFlagUrl,
}