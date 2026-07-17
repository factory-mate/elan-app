#!/bin/bash

SERVER_USER="Administrator"
SERVER_IP="222.71.113.250"
TARGET_DIR="E:/WWW_MES_PC"

set -e

echo "🚀 [1/3] 开始构建..."
pnpm build:prod

echo "📦 [2/3] 正在打包..."
cd dist/production
zip -r ../../dist.zip ./* > /dev/null
cd ../..

echo "🚚 [3/3] 正在上传..."

scp ./dist.zip ${SERVER_USER}@${SERVER_IP}:${TARGET_DIR}/dist.zip

ssh ${SERVER_USER}@${SERVER_IP} "powershell -Command \"
    cd '${TARGET_DIR}';
    if (Test-Path 'dist.zip') {
        Expand-Archive -Path 'dist.zip' -DestinationPath '${TARGET_DIR}' -Force;
        Remove-Item -Path 'dist.zip' -Force;
    }
\""

rm -f ./dist.zip

echo "🎉 发布成功！"
