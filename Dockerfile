# Node.js LTS 버전을 기반으로 하는 이미지를 사용합니다.
FROM node:lts-alpine AS builder

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# 패키지 파일들을 복사하고 종속성을 설치합니다.
COPY package.json yarn.lock ./
RUN yarn install

# 소스 코드를 복사합니다.
COPY . .

# React 애플리케이션을 빌드합니다.
RUN yarn build

# 두 번째 단계: 빌드된 애플리케이션을 호스팅할 웹 서버를 설정합니다.
FROM node:lts-alpine

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# 빌드된 애플리케이션을 복사합니다.
COPY --from=builder /app/build ./build

# serve를 설치합니다.
RUN npm install -g serve

# serve를 실행합니다.
CMD ["serve", "-s", "build", "-p", "8080"]
