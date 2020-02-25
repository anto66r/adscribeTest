# Platf0rm-2 Client application

[Production Build and Deploy](https://github.com/AdScribe/platf0rm-2/workflows/Production%20Build%20and%20Deploy/badge.svg)

> "I want nothing!"
>
> "And you shall receive it. In abundance!"

# Installation

Install `yarn` and Node > 8.10.

Run `yarn` in the client, server and root directories.

# Running locally

## Server

`cd server && yarn start:dev`

## Client

`cd client && yarn start`

## Concurrently

`yarn start`

## Code cleaning and tests:
Important! Change the git hooks default folder for this project
```
git config core.hooksPath hooks
```

## Cognito testing login:
user: javier
password: javier

# Developing

## Branch nomenclature

Branch names should have the following structure:

```
TASK/JIRA-DESCRIPTION
```

Where

* `TASK`: when a PR is opened on this branch, a label is automatically attached to it. TASKS can be:
  
  1. bug fixes: `fix`, `bugfix`, or `bug`
  2. features: `feature` or `feat`
  3. chores: `chore`
  4. other: `other`

* `JIRA`: this is the Jira ticket number for the corresponding ticket.
* `DESCRIPTION`: should be clear and concise.

This would be an example of a proper branch name: `fix/P2-21-correct-session-control`.

See [PR-labeler](https://github.com/TimonVS/pr-labeler-action) and [Release drafter](https://github.com/release-drafter/release-drafter).

## Commits

Commits should begin with the Jira ticket number.

## PRs

PR title should contain a clear, succint, description of work done. If the branch wasn't correctly labeled, this would be a good time to do it.

The structure of a PR is as follows:

- **Ticket**: should have a list of links to corresponding Jira tickets.
- **Description**: short description of work done
- **Summary**: Longer, more detailed summary of work
- **Behavior**: any relevant animated GIFs, images or descriptions

# Deployment

## Creating production build

## Deploying

# RBAC (Role Based Access Control)

## Roles

Two roles are read-only:

* **Administrator**: By default has access to the Roles section.

* **Basic** : Which is assigned automatically to newly created users

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
