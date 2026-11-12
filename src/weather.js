const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function fetchWeatherByCity(city) {
    if (!API_KEY) {
        throw new Error('Chave da API não configurada. Verifique o arquivo .env');
    }

    const params = new URLSearchParams ({
        q: city,
        units: 'metric',
        lang: 'pt_BR',
        appid: API_KEY
    })

    let response;

    try {
        response = await fetch(`${BASE_URL}?${params}`);
    } catch {
        throw new Error('Sem conexão. Verifique sua internet e tente novamente.');
    }

    if (response.status === 404) {
        throw new Error(`${city} não foi encontrada. Verifique se escreveu corretamente.`);
    }

    if (response.status === 401) {
        throw new Error('Chave da API inválida ou ainda não ativada');
    }

    if (!response.ok) {
        throw new Error('Não foi possível obter o clima. Tente novamente.')
    }

    return response.json();
}