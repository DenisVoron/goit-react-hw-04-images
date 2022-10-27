
export default function FetchImages(query, page = 1) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '29561801-8060ff7959275b65131112eea';
    const SETTINGS_URL = 'image_type=photo&orientation=horizontal&per_page=12';

    return fetch(`${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&${SETTINGS_URL}`)
        .then(response => response.json())
}