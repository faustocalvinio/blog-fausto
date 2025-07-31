# Script para probar generateBlogFile.js localmente
# Uso: .\test-generate-blog.ps1

Write-Host "🧪 Probando generateBlogFile.js localmente..." -ForegroundColor Green

# Simular variables del GitHub Action
$issueUrl = "https://github.com/faustocalvinio/blog-fausto/issues/999"
$issueTitle = "montar-wordpress-en-ubuntu"
$fileName = "${issueTitle}.md"

# Leer el contenido del archivo de prueba
$issueBody = Get-Content -Path "test-issue-body.txt" -Raw

# Simular las etiquetas (JSON)
$labelsJson = '[{"name": "content", "color": "1dac86"}]'

Write-Host "URL: $issueUrl" 
Write-Host "Archivo: $fileName"
Write-Host "Cuerpo (primeros 100 chars): $($issueBody.Substring(0, [Math]::Min(100, $issueBody.Length)))..." -ForegroundColor Cya

# Ejecutar el script Node.js
node src/generateBlogFile.js $issueUrl $fileName $issueBody $labelsJson

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n Script ejecutado exitosamente!" 
    Write-Host " Revisa la carpeta content/blog/ para ver el archivo generado" 
} else {
    Write-Host "`n Error al ejecutar el script" 
}

Write-Host "`n Limpiando archivos temporales..."
