# CodeRabbit Website

This repository contains the website for CodeRabbit, as well as the CMS for managing the website content.

## Table of Contents

- [Front](#front)
- [Installation](#installation)
- [Usage](#usage)

## front

front is a frontend application built with Next.js. It hosts the website.

## Installation

This project is set up as a monorepo using Turborepo. Follow these steps to get the project up and running:

1. Clone the repository.
2. Run `yarn install` at the root of the project to install dependencies for all packages.

**front:**

To start the front, run `yarn dev:front`.

**All apps:**

Run `yarn dev` in the root folder to start all apps simultaneously.

## Usage

**front:**

Visit `localhost:3000` in your browser to view the site.

---

# Git Branching Workflow & Deployment Strategy

![workflow.png](attachment:1b518033-8b58-4ba0-88bc-e3e12faea59e:workflow.png)

## 🛠️ Feature Development

- All new features and bug fixes are developed in separate **feature branches** off of `develop`.
- **Naming convention:** Based on the GitHub issue number — if your issue is 25, then the branch name should be `GI-25`
- Once a feature is complete and tested locally, it is merged into the `develop` branch.

## 🧪 Staging Environment

- Once the changes is validated, changes are merged into the `staging` branch.
- This environment is used by QA and internal teams for testing and validation before production deployment.
- Any urgent fixes that affect Production can be merged directly from a `hotfix` or patch branch and then taken to production

## 🚀 Production Deployment

- Once the staging environment is validated, changes are merged into the `main` branch.
- The `main` branch is automatically deployed to the **production environment**: [https://www.coderabbit.ai](https://www.coderabbit.ai/).
- Only stable, reviewed code is allowed in this branch to ensure production reliability.

## 🧩 Branches

| Branch    | Code Flow (Receives Code From) | Purpose                                  | Deployed To                                             | Branch Protection & Reviews |
| --------- | ------------------------------ | ---------------------------------------- | ------------------------------------------------------- | --------------------------- |
| `develop` | Feature branches, hotfixes     | Developer integration & internal testing |                                                         | No protection, open merge   |
| `staging` | `develop`, hotfixes            | Pre-production & QA testing before prod  | https://dev.coderabbit.ai                               | Protected, needs 1 review   |
| `main`    | `staging`                      | Live version of the app                  | [https://www.coderabbit.ai](https://www.coderabbit.ai/) | Protected, needs 1 review   |

## 💡 Best Practices

- Keep feature branches small and focused.
- Frequently pull the latest `develop` into your feature branch to avoid conflicts.
- Ensure all tests pass before opening a PR.
- Use meaningful commit messages.
- Review and test thoroughly before merging to `main`.
