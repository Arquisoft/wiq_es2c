# Usa la imagen base de Grafana desde Docker Hub
FROM grafana/grafana

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

RUN chown -R nonroot:nonroot ./

COPY dashboards ./
COPY datasources ./

USER nonroot