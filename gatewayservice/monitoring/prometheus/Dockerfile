# Use the Prometheus base image from Docker hub
FROM prom/prometheus

USER root

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

RUN chown -R nonroot:nonroot ./

COPY prometheus.yml ./

USER nonroot

EXPOSE 9090