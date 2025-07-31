# COMANDOS PARA PROBAR LOCALMENTE

## 1. Post interno (normal)
node src/generateBlogFile.js "https://github.com/faustocalvinio/blog-fausto/issues/999" "montar-wordpress-en-ubuntu.md" "$(Get-Content test-issue-body.txt -Raw)" '[{"name": "content"}]'

## 2. Post externo (con label external)
node src/generateBlogFile.js "https://github.com/faustocalvinio/blog-fausto/issues/998" "tutorial-externo-react.md" "# Tutorial de React por FreeCodeCamp`n`nEste es un excelente tutorial sobre React.`n`nPuedes encontrarlo en: https://freecodecamp.org/react-tutorial" '[{"name": "content"}, {"name": "external"}]'

## 3. Proyecto (con label project)
node src/generateBlogFile.js "https://github.com/faustocalvinio/blog-fausto/issues/997" "mi-nuevo-proyecto.md" "# Mi Nuevo Proyecto`n`nEste es un proyecto increíble que he estado desarrollando.`n`n## Características`n- Feature 1`n- Feature 2" '[{"name": "content"}, {"name": "project"}]'

## Comandos individuales para copy-paste:

### POST INTERNO:
node src/generateBlogFile.js "https://github.com/faustocalvinio/blog-fausto/issues/999" "montar-wordpress-en-ubuntu.md" "$(Get-Content test-issue-body.txt -Raw)" '[{"name": "content"}]'

### POST EXTERNO:
node src/generateBlogFile.js "https://github.com/faustocalvinio/blog-fausto/issues/998" "tutorial-externo-react.md" "# Tutorial de React por FreeCodeCamp

Este es un excelente tutorial sobre React que encontré.

Puedes encontrarlo en: https://freecodecamp.org/react-tutorial

## Lo que aprenderás
- Conceptos básicos de React
- Components y Props  
- State management" '[{"name": "content"}, {"name": "external"}]'

### PROYECTO:
node src/generateBlogFile.js "https://github.com/faustocalvinio/blog-fausto/issues/997" "mi-nuevo-proyecto.md" "# Mi Nuevo Proyecto

Este es un proyecto increíble que he estado desarrollando.

## Características
- Interfaz moderna
- Base de datos optimizada
- API REST

## Tecnologías utilizadas
- React
- Node.js
- MongoDB" '[{"name": "content"}, {"name": "project"}]'
