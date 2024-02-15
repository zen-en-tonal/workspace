FROM mcr.microsoft.com/vscode/devcontainers/base:0-buster

ENV DENO_INSTALL=/deno
RUN mkdir -p /deno && \
    curl -fsSL https://deno.land/x/install/install.sh | sh
RUN chown -R vscode /deno

WORKDIR /workspace

ENV PATH=${DENO_INSTALL}/bin:${PATH} \
    DENO_DIR=${DENO_INSTALL}/.cache/deno
