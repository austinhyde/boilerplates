#!/bin/bash
# include this file like:
#     # shellcheck disable=SC1090
#     source "$(dirname "$0")/..relpath../run-common.sh" #follow
# make sure the `..relpath..` is a path relative to the script
# the #follow ensures the auto-help picks up any variables or tasks in the sourced file

if [ -n "$DEBUG_RUN" ]; then
  set -x
fi

set -e -o pipefail
scriptpath="${BASH_SOURCE[1]}"
script="$(basename "$scriptpath")"
rootdir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." >/dev/null 2>&1 && pwd)"

cd "$( dirname "$scriptpath" )" >/dev/null 2>&1

function _run-cmd {
  echo 
  echo $'\e[1;37m>' "$*" $'\e[0m'
  command "$@"
}

function _run-info {
  echo $'\e[0;37m•' "$*" $'\e[0m'
}

# To be invoked by callers like `main "$@"`
function _run-main {
  # find include files (probably this one)
  IFS=$'\n' read -r -d '' -a files < <(sed -En 's/source "\$\(dirname "\$0")\/(.+)".*#follow/\1/p' "$script" && printf '\0')

  if [[ $# -eq 0 || "$1" == "help" || "$1" == "--help" ]]; then
    if [[ "$(type -t "$2")" ==  "function" ]]; then
      type "$2"
    else
      echo "Commands:"
      sed -En 's/^function (.*) \{ #/  \1/p' "$script" "${files[@]}"
      echo
      echo "Environment Variables:"
      sed -En 's/^: "\$\{(.+):=(.+)\}"( #)?/  \1=\2\t/p' "$script" "${files[@]}"
    fi
  else
    "$@"
  fi
}
