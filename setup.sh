#!/bin/sh

cd prt-backend
echo -e "\n>>> Installing backend dependencies"
npm install

cd ../prt-frontend
echo -e "\n>>> Installing frontend dependencies"
npm install

cd ..
echo -e "\n>>> Installing node-foreman"
npm install -g foreman

echo -e "\n\nSetup complete! Run the command \`nf -j Procfile.dev start\` to run both the backend and frontend.\n\n"
