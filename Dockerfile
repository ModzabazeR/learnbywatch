FROM ubuntu:latest

# Install bun
WORKDIR /root
RUN apt update && apt install -y curl unzip
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

COPY . /root/learnbywatch

WORKDIR /root/learnbywatch
RUN bun install

EXPOSE 5173
CMD ["bun", "run", "dev"]