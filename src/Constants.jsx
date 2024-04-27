const prod = {
    url: {
        API_BASE_URL: 'https://lizcalendal.com/api',
    }
}

const dev = {
    url: {
        // API_BASE_URL: 'http://localhost/api'
        API_BASE_URL: 'http://localhost:3000/api'
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod
