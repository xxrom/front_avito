# use existing docker image
FROM node:10-alpine

# Run in "docker build ."
COPY ./ ./
RUN yarn

# Cmd after running image
CMD ["yarn", "dev"]

# INSTRUCTION
# 1 build - " docker build -t workxrom/mywebset . "
# 2 run - " docker run -p 3002:3333 workxrom/mywebset "