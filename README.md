Página romántica — tema oscuro, frases y música (texto en español)

Archivos incluidos:
- `index.html` — página principal
- `styles.css` — estilos (tema oscuro y animaciones)
- `script.js` — lógica: reproducción de `background.mp3` (si existe), música ambiental por WebAudio, y frases animadas

Estado actual:
- He eliminado la sección de letra a petición tuya. En su lugar las frases aparecen en pantalla con colores y animaciones.
- La página intenta reproducir `background.mp3` si está presente en la carpeta; si no lo está, genera una música ambiental vía WebAudio.

Cómo añadir tu canción al paquete:
- Coloca un archivo llamado `background.mp3` (o `background.ogg`) en la raíz de la carpeta del proyecto (`Joda`). La página detectará ese archivo y lo usará como pista preferente.

Autoplay y activación de audio:
- Algunos navegadores bloquean el autoplay. Si esto ocurre verás un overlay con un botón para activar la música; pulsa para permitir el audio.

Frases animadas:
- Las frases se muestran con un degradado de color animado y un pequeño estallido de partículas cada vez que aparece una nueva frase.
- Puedes editar las frases en `script.js` dentro del array `phrases`.

Probar localmente (PowerShell):
```powershell
cd "C:\Users\USUARIO\Downloads\PROGRAMACION WEB\Joda"
python -m http.server 8000
```
Abre `http://localhost:8000` en tu navegador.

Siguientes pasos que puedo hacer por ti:
- Incluir una pista royalty-free como ejemplo en el paquete.
- Añadir animación floral "realista" (más partículas, sprites o SVG animado).
- Volver a añadir la sección de letra y sincronizarla con timestamps (`.lrc`) si lo deseas.

Dime qué prefieres y lo implemento.
Página romántica — tema oscuro, frases y música (texto en español)

Archivos incluidos:
- `index.html` — página principal
- `styles.css` — estilos (tema oscuro y animaciones)
- `script.js` — lógica: subida/reproducción de audio, frases, letra editable

Características principales:
- Tema oscuro, adaptable a dispositivos móviles.
- Subir una canción localmente con el botón "Subir canción" (no se incluye la canción por razones de licencia).
- Reproducir/pausar la canción con el botón "Reproducir".
- Sección para mostrar y editar la letra de la canción.
- Botones para mostrar frases románticas en español (siguiente / aleatoria).
- Animación floral y animación central (corazón) como detalle visual.

Prueba local (PowerShell):
Página romántica — tema oscuro, frases y música (texto en español)

Archivos incluidos:
- `index.html` — página principal
- `styles.css` — estilos (tema oscuro y animaciones)
- `script.js` — lógica: subida/reproducción de audio, frases, letra editable, generación de música ambiental si no hay archivo

Características principales:
- Tema oscuro, adaptable a dispositivos móviles.
- Subir una canción localmente con el botón "Subir canción" (no se incluye la canción por razones de licencia).
- Reproducir/pausar la canción con el botón "Reproducir".
- Sección para mostrar y editar la letra de la canción; la letra se muestra automáticamente cuando se inicia la música.
- Botones para mostrar frases románticas en español (siguiente / aleatoria). He añadido más frases con emojis.
- Animación floral y animación central (corazón) como detalle visual.

Autoplay y audio:
- La página intenta reproducir música automáticamente al entrar. Si tu navegador bloquea el autoplay, verás un botón central "Tocar y mostrar letra"; pulsa para activar el audio y mostrar la letra.
- Si no subes un archivo, la página genera una música ambiental suave mediante WebAudio (sintetizador), así no es necesario incluir un archivo musical con derechos.
- Si prefieres que incluya una canción concreta en el paquete, súbela en la carpeta y asegúrate de tener los derechos; puedo referenciarla en la página.

Añadir una canción al paquete
- Si quieres que la canción suene automáticamente al entrar y forme parte del paquete, coloca un archivo llamado `background.mp3` (o `.ogg`) en la raíz de esta carpeta (`Joda`). La página detectará `background.mp3` y usará ese archivo como pista preferente.
- Si prefieres que yo incluya una pista de ejemplo (royalty-free), dímelo y puedo descargar e integrarla aquí — confirma que quieres que descargue una pista de ejemplo.

Prueba local (PowerShell):
```powershell
cd "C:\Users\USUARIO\Downloads\PROGRAMACION WEB\Joda"
python -m http.server 8000
```
Abre `http://localhost:8000` en tu navegador.

Notas y personalización:
- Puedes editar las frases dentro de `script.js` (array `phrases`) o modificar la letra directamente en la sección "Letra" en la página.
- Si quieres que añada sincronización de letra (letra que avanza con la canción), dímelo y lo implemento en el siguiente paso.
- Me indicas si quieres que incluya una pista concreta (subes el archivo) o si prefieres que siga usando la música sintetizada.
