Write-Host "🔧 Prisma 잠금 해제 및 재빌드 시작..."

# 1. 경로 설정
$dllPath = "node_modules\.prisma\client\query_engine-windows.dll.node"

# 2. 잠금된 파일 삭제
if (Test-Path $dllPath) {
    Write-Host "🗑 기존 DLL 파일 삭제 중..."
    Remove-Item $dllPath -Force -ErrorAction SilentlyContinue
} else {
    Write-Host "✅ DLL 파일 없음"
}

# 3. .prisma 디렉토리 제거 (전체 삭제)
if (Test-Path "node_modules\.prisma") {
    Write-Host "🧹 .prisma 디렉토리 정리 중..."
    Remove-Item "node_modules\.prisma" -Recurse -Force -ErrorAction SilentlyContinue
}

# 4. 재빌드
Write-Host "⚙ Prisma generate 실행 중..."
npx prisma generate

Write-Host "🎉 완료! Prisma 클라이언트 재빌드 끝!"
