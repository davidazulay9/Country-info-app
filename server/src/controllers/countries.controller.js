import { countriesService } from "../services/countries.service.js"

const getAllCountries = async (req, res) => {
    try{
        const countries = await countriesService.getAllCountries();
        return res.status(200).json(countries);
    }catch(error){
        return res.status(400).json({ error: error.message });
    }
}

const getCountryDetails = async (req, res) => {
    const countryId = req.params.ID;
    try{
        const borderCountries = await countriesService.getBorderCountries(countryId);
        const populationData = await countriesService.getPopulationData();
        //const pupolationDataCountry = populationData.find((code) => code === countryId);
        const flagUrl = await countriesService.getFlagUrl();
        const response = {
            borderCountries: borderCountries,
            populationData: populationData.data.find((country) => country.country === borderCountries.commonName),
            flagUrl: flagUrl.data.find((country) => country.iso2 === countryId),
        }
        return res.status(200).json(response);
    }catch(error){
        return res.status(400).json({ error: error.message });
    }
}

export const countriesController = {
    getAllCountries,
    getCountryDetails,
}