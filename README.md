# NewSpeak

## 영어 뉴스로 학습하는 비즈니스 영어

---

![alt text](images/image.png)

### newSpeak v1.0

---

> **삼성청년 소프트웨어 아카데미 E103조** > **개발기간: 2024.08.19 ~ 2024.10.11**

### Link

---

> **https://j11e103.p.ssafy.io**

---

**Requirements**

For building and running the application you need:

- Node.js 20.15.0
- React 18.3.1
- Java 18
- Spring Boot 3.3.1
- Mysql 8.0.38

---

### Stacks 🐈

---

**Environment**

<img src="https://img.shields.io/badge/git-000000?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/gitlab-000000?style=for-the-badge&logo=gitlab&logoColor=white">

**Config**
<img src="https://img.shields.io/badge/npm-0052CC?style=for-the-badge&logo=npm&logoColor=white"> <img src="https://img.shields.io/badge/gradle-0052CC?style=for-the-badge&logo=gradle&logoColor=white">

**Development**

- **FrontEnd**
  <img src="https://img.shields.io/badge/javascript-0052CC?style=for-the-badge&logo=javascript&logoColor=white"> <img src="https://img.shields.io/badge/react-0052CC?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/Zustand-0052CC?style=for-the-badge&logo=redux&logoColor=white">

- **Backend**
  <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white"> <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white"> <img src="https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=Hibernate&logoColor=white"> <img src="https://img.shields.io/badge/openAi-412991?style=for-the-badge&logo=openAi&logoColor=white"> <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
- **DataBase**
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"> <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
- **Infra**
  <img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white"> <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"> <img src="https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=Amazon%20EC2&logoColor=white"> <img src="https://img.shields.io/badge/Kibana-005571?style=for-the-badge&logo=Kibana&logoColor=white"> <img src="https://img.shields.io/badge/Elasticsearch-005571?style=for-the-badge&logo=Elasticsearch&logoColor=white"> <img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white">

**projectMange**

<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white">

---

### System architecture

![alt text](images/image-9.png)

- MySQL 과 Monstache 를 사용하여 실시간 MongoDB 로 데이터 베이스를 구성.
  - MySQL은 RDB로 사용하며 비교적 작은 데이터와 조인을 해결.
  - MongoDB 와 ElasticSearch는 자연어 분석 검색 쿼리를 실행하기 위해 설계.

---

### User Interface

- 메인페이지

![alt text](images/image-1.png)

- 기사 상세 페이지

![alt text](images/image-2.png)

- 번역과 발음 평가

![alt text](images/image-4.png)

- 회화 페이지

  - 듣기와 추천

  ![alt text](images/image-5.png)

  - 말하기

  ![alt text](images/image-6.png)

- 회화 평가 보고서

![alt text](images/image-8.png)

---

### Main Feature

**FrontEnd**

**BackEnd**

> - OpenAi 챗봇 기능 구현
> - TTS를 활용한 회화 기능 구현
> - 회화 보고서 완성을 위한 OpenAi Assistant 활용
> - Google Cloud Storage를 활용한 저장소 확보
> - Oauth 2.0 을 활용한 JWT 인증

---

### Members

# 👨‍👨‍👧 팀원 소개

|           | 이창호                                           | 최지우                              | 정훈                              | 김동환                                     | 박영훈                             | 이권민                                      |
| --------- | ------------------------------------------------ | ----------------------------------- | --------------------------------- | ------------------------------------------ | ---------------------------------- | ------------------------------------------- |
| 프로필    | ![alt text](images/profile1.png)                 | ![img](images/profile2.ico)         | ![img](images/profile6.png)       | ![img](images/profile3.png)                | ![img](images/profile4.png)        | ![img](images/profile5.png)                 |
| 역할      | 팀장<br> Data, Infra                             | Frontend                            | Frontend                          | Backend                                    | Backend                            | Infra                                       |
| 세부 역할 | 데이터 수집 및 관리<br>DB설계<br>Project Mangage | UI/UX<br>Design<br>STT              | UI/UX<br>Design<br>STT            | OpenAI<br> CRUD <br> ElasticSearch         | Oauth2.0 <br> Nginx <br> JWT       | Jenckins pipeline <br> docker<br> Monstache |
| 깃헙 주소 | [Github](https://github.com/changho)             | [Github](https://github.com/ji-ooo) | [Github](https://github.com/hoon) | [Github](https://github.com/offensivesoup) | [Github](https://github.com/hoon2) | [Github](https://github.com/Gongman41)      |
