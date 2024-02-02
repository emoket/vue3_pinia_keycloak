# Keycloak authentication with Vue 3 + Pinia

## Keycloak

```bash
docker run -p 8081:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:19.0.3 start-dev
```

## Front End ('FE' directory)

Vue 3 + Keycloak.js

Keycloak을 이용하여 Token을 발행

- `npm install` && `npm run dev`

## Back End ('BE' directory)

Express + Jsonwebtoken

- `npm install` && `npm start`
