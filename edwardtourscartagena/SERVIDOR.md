# Servidor Local para Edward' Tours

## 🚀 ¿Por qué necesitas un servidor local?

El sitio web usa JavaScript moderno y requiere un servidor web para funcionar correctamente debido a políticas de seguridad del navegador (CORS).

## 📋 Opciones para iniciar el servidor:

### Opción 1: Usar el script automático (Recomendado)
1. Doble clic en `iniciar-servidor.bat`
2. Espera a que inicie
3. Abre http://localhost:8000 en tu navegador

### Opción 2: Python (si lo tienes instalado)
```bash
python -m http.server 8000
# o si tienes Python 3:
python3 -m http.server 8000
```

### Opción 3: Node.js (si lo tienes instalado)
```bash
npx http-server -p 8000
```

### Opción 4: Visual Studio Code
1. Instala la extensión "Live Server"
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"

### Opción 5: XAMPP/WAMP
1. Copia los archivos a la carpeta `htdocs` (XAMPP) o `www` (WAMP)
2. Inicia Apache
3. Accede a http://localhost/edwardtourscartagena

## ⚠️ Importante

**No funcionará correctamente** si abres directamente el archivo `index.html` (file:// protocol) debido a:
- Restricciones CORS
- Módulos JavaScript que requieren contexto HTTP
- Cargas de imágenes y recursos dinámicos

## 🔍 Verificación

Una vez iniciado el servidor, deberías ver:
- ✅ Las 6 imágenes del carrusel cambiando cada 3 segundos
- ✅ Controles de navegación funcionando
- ✅ Formulario de reserva con validación
- ✅ Todos los efectos y animaciones

## 🌐 Acceso

Después de iniciar el servidor, accede a:
**http://localhost:8000**

Si usaste otro puerto, reemplaza el 8000 por el puerto correspondiente.