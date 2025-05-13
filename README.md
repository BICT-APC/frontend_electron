# Docker

## 개발용

```bash
docker build -f dockerfile.dev -t bict/frontend-dev .
docker tag bict/frontend-dev 192.168.0.18:5000/bict/frontend-dev
docker push 192.168.0.18:5000/bict/frontend-dev
docker run -d --gpus all -v %cd%:/app --name frontend-dev bict/frontend-dev tail -f /dev/null
```

## 프로덕션용

```bash
docker build -f dockerfile.prod -t bict/frontend .
docker tag bict/frontend 192.168.0.185:32000/bict/frontend
docker push 192.168.0.185:32000/bict/frontend
docker run --rm --gpus all bict/frontend
```

# 환경변수

- VITE_TARGET_BASE_URL
- VITE_TURN_SERVER
- VITE_SFU_SERVER
