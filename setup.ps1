Write-Output "`n>>> Installing backend dependencies"
Set-Location prt-backend
npm install

Write-Output "`n>>> Installing frontend dependencies"
Set-Location ..\prt-frontend
npm install

Set-Location ..

Write-Output "`n>>> Installing node-foreman"
npm install -g foreman

Write-Output "`n`nSetup complete! Run the command ``nf -j Procfile.dev start`` to run both the backend and frontend.`n`n"
