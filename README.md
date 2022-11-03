# applications.paper-trail.api-service

## Auth flow

1. Get Google OAuth token (GOAT) from UI
1. Check if GOAT still valid
1. Use principal from GOAT to check access token
1. If access token exists but expired, attempt to renew
1. If attempt to renew fails, go through re-auth
1. If no access token, go through re-auth

## Class Responsibilities

- app
- data-access-layer
- models
- services
- utils
