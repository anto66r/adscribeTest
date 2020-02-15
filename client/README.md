# Platf0rm-2 Client application

> "I want nothing!"
>
> "And you shall receive it. In abudnance!"

## Installation

Install `yarn` and Node > 8.10.

Run `yarn` in the client, server and root directories.

## Running locally

### Server

`cd server && yarn start:dev`

### Client

`cd client && yarn start`

### Concurrently

`yarn start`

## Deployment
### Creating production build

### Deploying

## RBAC (Role Based Access Control)

## Roles

Two roles are read-only:

Administrator
: By default has access to the Roles section.

Basic
: Which is assigned automatically to newly created users

A role has an array of permissions assigned to it.

### Creating roles
Roles can be created but must have unique names.

### Editing roles
Roles can be edited to modify their name and assigned permissions.

### Deleting roles
All roles can be deleted except `Administrator` and `Basic`.

## Permissions

Permissions are strings that specify a _route_ and an _action_, separated by `::`.


For example, a permission which is
`users|roles::assign` will allow the user to assign roles to users via the user editing screen.

There are four basic actions:
- `create`: allows creation of resources at the route.
- `delete`: allows deletion resources at the route.
- `update`: allows editing resources at the route.
- `view`: allows access to a listing of resources at the route.

Possible routes are:
- `users`: users section
  - `users|roles`: roles subsection of the users section
- `roles`: roles section

And so on.

The master list of permissions lives in the `src/config` folder of the client.
