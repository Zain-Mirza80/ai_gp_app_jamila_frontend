@echo off
echo Ensuring Docker Desktop is running...
start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
cd /d path\to\your\project\frontend
docker build -t gcr.io/smart-med-connect/smart-med-connect .
docker push gcr.io/smart-med-connect/smart-med-connect
powershell -Command "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process"
gcloud run deploy smart-med-connect --image gcr.io/smart-med-connect/smart-med-connect --platform managed --region europe-west1
echo Deployment completed.
pause
