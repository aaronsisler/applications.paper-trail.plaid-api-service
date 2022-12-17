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
  - Expose REST endpoints
  - Call services
- data-access-layer
  - DAOs orchestrate the DB Transaction and the SQL statement management
- models
- services
  - Call DAOs
- utils

## TODOs

- When user access token is created

  - check if item_id exists in INSTITUTION, add if doesn't exist
  - Fetch accounts assosociated with the access_token
  - Check if accounts are in INSTITUTION_ACCOUNT table, add if doesn't exist

- Figure out read and readAll interface for DAO
- Check if we can use class and decorators instead of interfaces for models
