#!/bin/bash

echo "Switching .dockerignore to .dockerignore.batch"
cp .dockerignore.batch .dockerignore

echo "Deploying to Fly.io with Dockerfile.batch"
fly deploy  -c fly.batch.toml

echo "Restoring original .dockerignore"
git restore .dockerignore

echo "Deployment completed successfully!"
