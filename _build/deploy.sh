#!/bin/bash
# Exit if trying to deploy from non-master branch

if [ "$(git branch | grep '*')" != "* master" ]; then
	if [ "$(git branch | grep 'detached')" ]; then
		echo "Deploying from detached branch"
	else
		echo "Must deploy from master branch, please merge to master then try again, current branch: $(git branch | grep '*')"
		exit 1
	fi
else
	echo "Deploying from master"
fi

# Clean the tmp folders
BUILD_FOLDER="_builddist"
rm -rf "$BUILD_FOLDER"

# Checkout the current repo
if [[ -z $GITHUB_PERSONAL_ACCESS_TOKEN ]]
then
  git clone -b gh-pages git@github.com:kfug/handson.git $BUILD_FOLDER
else
  git clone -b gh-pages https://$GITHUB_USER:$GITHUB_PERSONAL_ACCESS_TOKEN@github.com/kfug/handson.git $BUILD_FOLDER
fi

npm run build

cd $BUILD_FOLDER
git checkout gh-pages
git add . --all --force
git commit -m "Automatic deployment of $(git rev-parse HEAD)"
git push origin gh-pages
