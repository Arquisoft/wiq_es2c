# Use the Grafana base image from Docker hub
FROM grafana/grafana

USER root

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

RUN chown -R nonroot:nonroot ./

COPY provisioning ./provisioning

USER nonroot