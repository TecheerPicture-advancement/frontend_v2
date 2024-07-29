FROM node:21-alpine as build-stage

WORKDIR /frontend

# package.json과 package-lock.json 파일 복사
COPY package.json package-lock.json ./

# npm 설치
RUN npm install

# 애플리케이션 소스 코드 복사
COPY . ./

# 애플리케이션 빌드
RUN npm run build

# 포트 노출
EXPOSE 3000

# 애플리케이션 시작
CMD ["npm", "run", "dev"]
