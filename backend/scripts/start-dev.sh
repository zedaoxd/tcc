#!/bin/bash

npm install

npx prisma migrate dev --name "initial_migration"

npm run start:dev
