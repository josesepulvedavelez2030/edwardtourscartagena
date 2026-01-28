@echo off
echo Iniciando servidor local para Edward' Tours Cartagena...
echo Abre http://localhost:8000 en tu navegador
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

REM Verificar si Python está instalado
python --version >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo Usando Python servidor...
    python -m http.server 8000
    goto :end
)

REM Verificar si Python 3 está instalado
python3 --version >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo Usando Python 3 servidor...
    python3 -m http.server 8000
    goto :end
)

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo Usando Node.js servidor...
    npx http-server -p 8000
    goto :end
)

echo No se encontró Python ni Node.js instalados.
echo Por favor, instala Python desde https://python.org o Node.js desde https://nodejs.org
echo.
echo Alternativamente, puedes usar cualquier servidor web como:
echo - Live Server extension en VS Code
echo - PHP built-in server: php -S localhost:8000
echo - XAMPP, WAMP, o cualquier otro servidor web

:end
pause