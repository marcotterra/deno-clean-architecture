FROM denoland/deno:alpine-1.29.1

ARG DB_HOST
ENV DB_HOST $DB_HOST
ARG DB_PORT
ENV DB_PORT $DB_PORT
ARG DB_USERNAME
ENV DB_USERNAME $DB_USERNAME
ARG DB_SYNC
ENV DB_SYNC $DB_SYNC
ARG APP_PORT
ENV APP_PORT $APP_PORT
ARG DB_PASSWORD
ENV DB_PASSWORD $DB_PASSWORD

EXPOSE $APP_PORT

USER root

WORKDIR /usr/app

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
# COPY deps.ts .
# RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache run.ts

CMD ["run", "--allow-net", "--allow-read", "--allow-env", "run.ts"]
