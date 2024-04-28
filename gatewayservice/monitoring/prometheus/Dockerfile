# Usa la imagen base de Prometheus desde Docker Hub
FROM prom/prometheus

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

RUN chown -R nonroot:nonroot ./

COPY prometheus.yml ./

USER nonroot