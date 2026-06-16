FROM postgres:16-alpine

# Any *.sql / *.sh placed in initdb/ runs once, on first database init
# (i.e. only when the data volume is empty). Safe to leave empty.
COPY initdb/ /docker-entrypoint-initdb.d/
