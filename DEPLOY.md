# Desplegar Ravenball a producción (Vercel)

1. Instala el CLI de Vercel si no lo tienes:
   npm install -g vercel

2. Entra a la carpeta del proyecto (`ravenball`) e instala dependencias:
   cd ravenball
   npm install

3. Inicia sesión:
   vercel login

4. Despliega a producción:
   vercel --prod

5. Para conectar el dominio real (ravenball.com), en el dashboard de Vercel:
   Project Settings → Domains → Add → ravenball.com
   y actualiza el DNS según las instrucciones de Vercel.

6. (Opcional) Para autodeploy en cada push, sube este código al repo
   DeepDiveTechLab/ravenball (reemplazando el contenido actual) y conéctalo
   en Vercel → New Project → Import Git Repository.
