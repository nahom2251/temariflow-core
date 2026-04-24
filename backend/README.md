# TemariFlow ERP Backend

Spring Boot + Java + PostgreSQL foundation for Phase 1.

## Run

```bash
cd backend
DB_URL=jdbc:postgresql://localhost:5432/temariflow DB_USERNAME=postgres DB_PASSWORD=postgres JWT_SECRET='replace-with-64-char-secret' mvn spring-boot:run
```

Swagger UI: http://localhost:8080/swagger-ui.html

## Included
- JWT login and refresh tokens
- User and school registration
- BCrypt password hashing
- OTP verification and password reset endpoints
- Role-based authorization
- Multi-tenant `school_id` model and tenant context filter helper
- Subscription plans, payment verification workflow, audit logs
- Super Admin core APIs
