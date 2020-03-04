# Platf0rm-2

![Production Build and Deploy](https://github.com/AdScribe/platf0rm-2/workflows/Production%20Build%20and%20Deploy/badge.svg)

> "I want nothing!"
>
> "And you shall receive it. In abundance!"

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

## Development

### Commit hooks

Important! Change the git hooks default folder for this project
```
git config core.hooksPath hooks
```

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
