#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Print the GraphQL endpoint being used
echo "Building with NEXT_PUBLIC_GRAPHQL_ENDPOINT=${NEXT_PUBLIC_GRAPHQL_ENDPOINT}"
echo "Building with MONGODB_URI=${MONGODB_URI}"

# Check if the environment variable is set
if [ -z "${NEXT_PUBLIC_GRAPHQL_ENDPOINT}" ]; then
  echo "Error: NEXT_PUBLIC_GRAPHQL_ENDPOINT is not set for build"
  exit 1
fi

# Run the build
npm run build
