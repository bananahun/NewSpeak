FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY build/libs/myapp.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
