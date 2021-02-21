#!/bin/bash
# include this file _after_ run-common.sh like:
#     # shellcheck disable=SC1090
#     source "$(dirname "$0")/..relpath../run-docker.sh" #follow
# make sure the `..relpath..` is a path relative to the script
# the #follow ensures the auto-help picks up any variables or tasks in the sourced file

: "${USE_DEV_DOCKER:=yes}" # if no, don't invoke the command inside the dev docker container
: "${DEV_DOCKER_REBUILD:=no}" # if yes, rebuild the dev docker image

# change these to customize the dev docker image build
_run_dev_docker_tag="devimg:1"
_run_dev_docker_dir="." # remove if using a stock image
_run_dev_docker_file="dev.Dockerfile" # remove if using a stock image

# keep track of how we originally invoked this
orig_args=("$@")

function _run-in-docker {
  if [[ $USE_DEV_DOCKER == "yes" ]]; then
    _run-build-dev-docker # remove if using a stock image
    script="$(basename "$scriptpath")"
    _run-info "Running './$script ${orig_args[*]}' in development container"

    docker_args=(
      --rm
      --network host
      -e USE_DEV_DOCKER=no
      -w /home/dev
      -v "$(pwd):/home/dev"

      # enable docker access in-image
      # -v /var/run/docker.sock:/var/run/docker.sock

      # golang support
      # -e GOFILE -e GOPACKAGE
      # -v "${GOPATH:-$HOME/go}/pkg/mod:/go/pkg/mod"
    )
    
    exec docker run "${docker_args[@]}" "$@" "$_run_dev_docker_tag" "./$script" "${orig_args[@]}"
  fi
}

# remove if using a stock image
function _run-build-dev-docker {
  if [[ $DEV_DOCKER_REBUILD == yes || -z "$(docker images -q "$_run_dev_docker_tag")" ]]; then
    _run-info "Building dev docker image"
    _run-cmd docker build -f "$_run_dev_docker_file" -t "$_run_dev_docker_tag" "$_run_dev_docker_dir"
  fi
}
