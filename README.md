# Platf0rm-2

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

### Client

client could be run with every style theme that we provide, by default run up with `adscrbe` theme.

```shell
cd client && yarn start
```

#### with 605 theme

```shell
cd client && yarn start:theme:605
```

### Concurrently

`yarn start`

### Components

To run the storybook application with all components stock

```shell
cd client && yarn run components
```

#### with 605 theme

```shell
cd client && yarn run components:theme:605
```

## Development

## Code cleaning and tests:
Important! Change the git hooks default folder for this project
```
git config core.hooksPath hooks
```

## Cognito testing login:
user: javier.olmo@zartis.com
password: javier


# .env Variables


## Client

All these variables are exposed to the client so we have to take care about what we could expose or not. This is needed for authenticating with cognito directly without creating a full proxy server for Cognito calls. No passwords/secrets should come here

There are two configuration files 

**.env.local**: Used in development

    REACT_APP_API_URL=http://localhost:5000/api
    REACT_APP_COGNITO_COOKIE_LIFE_TIME=3600000
    REACT_APP_COGNITO_REGION=eu-west-1
    REACT_APP_USER_POOL_BASE_URL=https://platf0rm-2.auth.eu-west-1.amazoncognito.com
    REACT_APP_COGNITO_USER_POOL=eu-west-1_DHnOy5Z5o
    REACT_APP_COGNITO_CLIENT_ID=51tm9phb9mj7vk3127orovh9td

The prefix REACT_APP_ is needed to expose variables in the client when using a non-ejected Create React App. Otherwise the variables will not be exposed

**.env**: Used in production

    REACT_APP_API_URL=http://platf0rm-2-LB-667582202.eu-west-1.elb.amazonaws.com:5000/api
    REACT_APP_COGNITO_COOKIE_LIFE_TIME=3600000
    REACT_APP_COGNITO_REGION=eu-west-1
    REACT_APP_USER_POOL_BASE_URL=https://platf0rm-2.auth.eu-west-1.amazoncognito.com
    REACT_APP_COGNITO_USER_POOL=eu-west-1_DHnOy5Z5o
    REACT_APP_COGNITO_CLIENT_ID=51tm9phb9mj7vk3127orovh9td

**REACT_APP_API_URL**: 

Server address that handles the API endpoint

**REACT_APP_COGNITO_COOKIE_LIFE_TIME**: 

Time (millis) of expiration of a session token. The server will manage automatically the refresh of this token once expired without the need of the user interaction

**REACT_APP_COGNITO_REGION**: 

Server region of Amazon Cognito endpoint (west-1 meaning IRELAND)

**REACT_APP_USER_POOL_BASE_URL**: 

Amazon Cognito endpoint for authenticating/interacting with user accounts

**REACT_APP_COGNITO_USER_POOL**: 

Pool ID for accessing the Adsense private pool in Cognito.

**REACT_APP_COGNITO_CLIENT_ID**: 

Cognito Client ID for accessing the Adsense private pool.

## Server

Here we have stored the admin cognito user password (or routed to github secrets) which can manage all the possible interactions with the server. This file should be secured 

We have four configuration files that are located in the /env/ folder

**development.env**: Should point to a local server. Used only in development

**production.env:** Should point to servers mongoDB and productiion Cognito pool.

**test.env**: Only for jasmine test suite

    NODE_ENV=development
    PORT=5000
    
    MONGO_URI=mongodb+srv://??????????????????????????????????
    COGNITO_REGION=eu-west-1
    COGNITO_USER_POOL=eu-west-1_DHnOy5Z5o
    COGNITO_COOKIE_LIFE_TIME=3600000
    BYPASS_API_SECURITY=false
    
    COGNITO_SERVER_APP_CLIENT_ID=AKIAXVFM5N6KP42GRQCD
    COGNITO_SERVER_APP_CLIENT_SECRET= <????????????????????????>

**NODE_ENV**: Required for selecting the specific server .env file

**PORT**: Local port where the server is going to be exposed

**MONGO_URI**: URI For connecting with the mongo database

**COGNITO_REGION**: Server region of Amazon Cognito endpoint (west-1 meaning IRELAND)

**COGNITO_USER_POOL**: Pool ID for accessing the Adsense private pool in Cognito.

**COGNITO_COOKIE_LIFE_TIME**: Expiration time of a session token (in millis)

**BYPASS_API_SECURITY**: Set it true to be able to call the AP bypassing the authentication middleware

**COGNITO_SERVER_APP_CLIENT_ID**: Cognito Client ID for accessing the Adsense private pool.

**COGNITO_SERVER_APP_CLIENT_SECRET**: The Cognito super user secret for managing specific tasks like creating/editing or removing a user in Cognito

# Developing

## Branch nomenclature

Branch names should have the following structure:

```
TASK/JIRA-DESCRIPTION
```

Where

* `TASK`: when a PR is opened on this branch, a label is automatically attached to it. TASKS can be:

  1. Features: `feat`
   New features added.
  2. Bug fixes: `fix`
   Bug fixes.
  3. Maintenance: `chore`
   Updating grunt tasks etc; no production code change.
  4. Documentation: `docs`
   Changes to documentation
  5. Refactor: `refactor`
   Refactoring production code.

See [Semantic commit messages](https://seesparkbox.com/foundry/semantic_commit_messages).

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

### Cognito testing login:
user: javier.olmo@zartis.com
password: javier

(You can make your own through the user panel!)

## Deployment

As PRs are merged into the master branch, their titles are added to the list of changes are described in a draft release. Automatic deployment takes place when that release is published.

### Github workflow

The workflow traces the following steps

#### Flow trigger

Any published release will trigger the flow:

```
on:
  release:
    types: [published]
```

#### Fetch AWS credentials

Credentials are fetched from AWS with the secrets stored at Github.

#### Build, tag, and push images

Each of these steps builds a Docker image, tags it with the release number, and pushes it to the ECR repo. The tagged image is available as output for other steps of the job.

#### Create ECS task definition file

This step takes the tagged images and builds a ECS task definition JSON file, including the Execution Role ARN, which is stored as a Github secret.

#### Create Task definition

The revision number which is returned by the task definition registration is exported from this step as `taskrevision`.

#### Create ECS service definition JSON

The Target Group for each port (80 and 5000), Subnets, Security Group, and task revision number are used to generate a proper ECS service definition JSON file, which is used by the next step to create the service.

URL for the Load Balancer is platf0rm-2-LB-667582202.eu-west-1.elb.amazonaws.com.

## Component library

To run storybook app locally to see and test all our UI components:

```
yarn run components
```

To build storybook:

```
yarn run components:build
```

## RBAC (Role Based Access Control)

### Roles

Two roles are read-only:

* **Administrator**: By default has access to the Roles section.

* **Basic** : Which is assigned automatically to newly created users

A role has an array of permissions assigned to it.

#### Creating roles
Roles can be created but must have unique names.

#### Editing roles
Roles can be edited to modify their name and assigned permissions.

#### Deleting roles
All roles can be deleted except `Administrator` and `Basic`.

### Permissions

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

## Infrastructure

![Platf0rm-2 infrastructure](/images/AdScribeInfrastructure.png)
