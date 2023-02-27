# Kreative Templates v1 API Reference

## Welcome Dreamer 👋

This document describes the Kreative Templates v1 API. It is intended for Kreative developers who want to integrate Kreative Templates into their own applications and for the Templates team to build the client-side application. It is not intended for end users.

## <a name="introduction"></a> Introduction

The Kreative Templates v1 API is a RESTful API that allows you to access and modify the data in the Kreative Templates database. The API is organized around REST, which means that all requests are made to a single URL and the response will be in a standard format. The API uses HTTP response codes to indicate the success or failure of requests and uses standard HTTP authentication schemes for authentication.

The API is mainly intended for use by the Kreative Templates client-side application, but it can also be used by third-party applications within the Federation.

The API is currently in development and is subject to change. We will do our best to keep this documentation up to date, but if you notice any inconsistencies or errors, please let us know.

## <a name="authentication"></a> Authentication

Authentication is handled through a rough integration with Kreative ID, our in-house authentication and authorization system. The API uses the same Appchain, AIDN, and Kreative ID Key secrets as Kreative ID requires. The API uses the AIDN to sign JWTs for authentication to link the Kreative ID Key for a user with Kreative Templates API.

Every request made to Kreative Templates API that requires authentication must send a Kreative ID Key, Appchain, and AIDN. The API uses `KREATIVE_AIDN`, `KREATIVE_APPCHAIN`, and `KREATIVE_ID_KEY` environment variables to authenticate requests. The API will return a 400 Bad Request error if any of these headers are not set.

Every user with a Kreative account has a set of permissions that allow them to access certain parts of the API. The API uses the Kreative ID Key to determine the permissions of the user making the request. The API will return a 401 Unauthorized error if the user does not have permission to access the requested resource. Currently, we have a basic permissions implementation setup for Kreative ID. Eventually, we will have a role-based permissions system that will allow us to give users more granular permissions based on predefined roles.

### Permissions
- `KREATIVE_SUPER_ADMIN`: this is a specific permission that is only granted to employees of Kreative. This permission allows the user to access all resources in the API, but it is specfically for Kreative employees to manage backend data through a dashboard.
- `KREATIVE_TEMPLATES_USER`: this is the basic permission that is granted to all users. This permission allows the user to access all resources that require a basic permission and to access data pertaining to their own account.

## Explore all entities
- [Templates](https://github.com/kreative/templates-api/wiki/Templates)
- [Authors](https://github.com/kreative/templates-api/wiki/Authors)
- [Categories](https://github.com/kreative/templates-api/wiki/Categories)
- [Plugins](https://github.com/kreative/templates-api/wiki/Plugins)
- [Downloads](https://github.com/kreative/templates-api/wiki/Downloads)