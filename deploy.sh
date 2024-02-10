yarn install
yarn build
docker build -t algo-me-front .
docker run -p 8080:80 algo-me-front
