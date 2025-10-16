#!/bin/bash

# Usage:
# ./run.sh <GitHub-Owner> <GitHub-Repo>

OWNER=$1
REPO=$2

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
  echo -e "\033[0;31mGitHub CLI (gh) is not installed. Please install it from https://cli.github.com/\033[0m"
  exit 1
fi

# Validate input parameters
if [ -z "$OWNER" ] || [ -z "$REPO" ]; then
  echo -e "\033[1;33mUsage: ./run.sh <GitHub-Owner> <GitHub-Repo>\033[0m"
  exit 1
fi

# Disable prompt mode to avoid Vim/editor
gh config set prompt disabled >/dev/null 2>&1

# Fetch all workflow run IDs silently
workflow_runs=$(gh api repos/$OWNER/$REPO/actions/runs --paginate --jq '.workflow_runs[].id')

# Loop through each run ID and delete it
for run_id in $workflow_runs; do
  echo "Deleting workflow run ID: $run_id"
  gh api repos/$OWNER/$REPO/actions/runs/$run_id -X DELETE --silent
done

echo "All workflow runs have been deleted."
