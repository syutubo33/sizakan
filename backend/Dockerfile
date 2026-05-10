FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

# Gradleの実行権限を付与
RUN chmod +x ./gradlew

RUN ./gradlew build -x test

CMD ["java", "-jar", "build/libs/backend-0.0.1-SNAPSHOT.jar"]
