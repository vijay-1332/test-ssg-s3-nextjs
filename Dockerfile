# Dockerfile for Next.js Production Build

# ---- Base Node image for building ----
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies first, in a separate layer to leverage Docker cache
COPY package.json package-lock.json* yarn.lock* ./
# Prefer npm ci for production installs if package-lock.json exists
RUN if [ -f package-lock.json ]; then npm ci; else yarn install --frozen-lockfile; fi

# ---- Builder Stage ----
FROM base AS builder
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .

# Set NEXT_TELEMETRY_DISABLED to 1 to disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED 1

# Add ARG for the GraphQL endpoint and set it as ENV
ARG NEXT_PUBLIC_GRAPHQL_ENDPOINT_ARG
ENV NEXT_PUBLIC_GRAPHQL_ENDPOINT=${NEXT_PUBLIC_GRAPHQL_ENDPOINT_ARG}

# Copy the build script and make it executable
COPY build_script.sh /app/build_script.sh
RUN chmod +x /app/build_script.sh

# Run the build script
RUN /app/build_script.sh

# ---- Runner Stage ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Set the user to the non-root user
USER nextjs

EXPOSE 3000

# Define the command to run your app
# The standalone output creates a server.js file in the .next/standalone directory
CMD ["node", "server.js"]
