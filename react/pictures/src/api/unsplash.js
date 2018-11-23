import axios from 'axios';

const agent = axios.create({
    baseURL: 'https://api.unsplash.com/',
    headers:{
        Authorization:'Client-ID 8b733366571fab35889e6d98e9b518e9130e37f0b8fcd52484e33994e039dbd4'
    }
});

export default agent;