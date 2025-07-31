const fs = require("fs");
const path = require("path");

function generateBlogPost() {
   const args = process.argv.slice(2);

   if (args.length < 4) {
      console.error(
         "Faltan argumentos. Uso: node generateBlogFile.js <issueUrl> <fileName> <issueBody> <labelsJson>"
      );
      process.exit(1);
   }

   const [issueUrl, fileName, issueBody, labelsJson] = args;

   console.log("🔍 Argumentos recibidos:");
   console.log("📍 URL:", issueUrl);
   console.log("📄 Archivo:", fileName);
   console.log(
      "📝 Cuerpo (primeros 100 chars):",
      issueBody.substring(0, 100) + "..."
   );
   console.log("🏷️ Labels JSON recibido:", labelsJson);

   try {
      let labels;
      try {
         labels = JSON.parse(labelsJson);
      } catch (parseError) {
         console.error("❌ Error parseando JSON original:", parseError.message);
         console.log("🔧 Intentando limpiar JSON...");

         const cleanedJson = labelsJson
            .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
            .replace(/\\/g, "\\\\")
            .trim();

         console.log("🧹 JSON limpio:", cleanedJson);

         try {
            labels = JSON.parse(cleanedJson);
         } catch (cleanError) {
            console.error(
               "❌ Error parseando JSON limpio:",
               cleanError.message
            );
            console.log("🆘 Usando labels por defecto");
            labels = [{ name: "content" }];
         }
      }

      console.log("✅ Labels parseadas:", labels);

      const issueNumber = extractIssueNumber(issueUrl);
      const cleanFileName = sanitizeFileName(fileName);
      const formattedTitle = formatTitle(fileName);

      console.log("🔢 Issue número:", issueNumber);
      console.log("📂 Nombre archivo limpio:", cleanFileName);
      console.log("📝 Título formateado:", formattedTitle);

      const targetFolder = determineTargetFolder(labels);

      const isExternal = detectExternalPost(issueBody, labels);

      console.log("Carpeta destino:", targetFolder);
      console.log("Es externo:", isExternal);

      const markdownContent = isExternal
         ? generateExternalMarkdownContent(
              formattedTitle,
              issueBody,
              issueUrl,
              issueNumber,
              labels
           )
         : generateInternalMarkdownContent(
              formattedTitle,
              issueBody,
              issueUrl,
              issueNumber,
              labels
           );

      const fullPath = path.join(process.cwd(), "content", targetFolder);
      if (!fs.existsSync(fullPath)) {
         fs.mkdirSync(fullPath, { recursive: true });
      }

      const filePath = path.join(fullPath, cleanFileName);
      fs.writeFileSync(filePath, markdownContent);

      console.log(`Archivo generado exitosamente: ${filePath}`);
      console.log(`Carpeta: ${targetFolder}`);
      console.log(`Archivo: ${cleanFileName}`);
      console.log(`Tipo: ${isExternal ? "External" : "Internal"}`);
      console.log(
         `Contenido generado (primeros 200 chars):`,
         markdownContent.substring(0, 200) + "..."
      );
   } catch (error) {
      console.error("Error al generar el archivo:", error.message);
      console.error("Stack trace:", error.stack);
      console.error("Argumentos que causaron el error:");
      console.error("URL:", issueUrl);
      console.error("Archivo:", fileName);
      console.error("Labels JSON:", labelsJson);
      process.exit(1);
   }
}

function extractIssueNumber(issueUrl) {
   const match = issueUrl.match(/\/issues\/(\d+)/);
   return match ? match[1] : "unknown";
}

function sanitizeFileName(fileName) {
   let cleanName = fileName.replace(/\.md$/i, "");

   cleanName = cleanName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

   return cleanName + ".md";
}

function formatTitle(originalTitle) {
   // Remove .md extension if present
   let title = originalTitle.replace(/\.md$/i, "");
   
   // Replace underscores and multiple dashes with spaces
   title = title.replace(/[_-]+/g, " ");
   
   // Capitalize each word (title case)
   title = title.replace(/\b\w+/g, (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
   });
   
   // Clean up extra spaces
   title = title.replace(/\s+/g, " ").trim();
   
   return title;
}

function determineTargetFolder(labels) {
   const labelNames = labels.map((label) => label.name.toLowerCase());

   if (labelNames.includes("project") || labelNames.includes("projects")) {
      return "projects";
   }

   return "blog";
}

function detectExternalPost(issueBody, labels) {
   const labelNames = labels.map((label) => label.name.toLowerCase());
   if (labelNames.includes("external")) {
      return true;
   }

   const urlPattern = /https?:\/\/[^\s]+/g;
   const urls = issueBody.match(urlPattern);

   // Si hay URLs externas (no del repositorio) y el contenido es corto, probablemente es externo
   if (urls && urls.length > 0) {
      const externalUrls = urls.filter(
         (url) =>
            !url.includes("github.com") ||
            !url.includes("localhost") ||
            url.includes("freecodecamp.org") ||
            url.includes("medium.com") ||
            url.includes("dev.to") ||
            url.includes("blog.")
      );

      // Si el contenido es relativamente corto y tiene URLs externas, es probablemente externo
      const wordCount = issueBody.split(/\s+/).length;
      if (externalUrls.length > 0 && wordCount < 500) {
         return true;
      }
   }

   // 3. Palabras clave que indican contenido externo
   const externalKeywords = [
      "article by",
      "tutorial by",
      "post by",
      "guide by",
      "by freecodecamp",
      "external link",
      "original article",
      "source:",
   ];

   const bodyLower = issueBody.toLowerCase();
   if (externalKeywords.some((keyword) => bodyLower.includes(keyword))) {
      return true;
   }

   return false;
}

function extractExternalUrl(issueBody) {
   // Extraer la primera URL externa válida del contenido
   const urlPattern = /https?:\/\/[^\s]+/g;
   const urls = issueBody.match(urlPattern);

   if (urls && urls.length > 0) {
      // Filtrar URLs externas válidas
      const externalUrls = urls.filter(
         (url) =>
            !url.includes("github.com/faustocalvinio") &&
            !url.includes("localhost") &&
            (url.includes("freecodecamp.org") ||
               url.includes("medium.com") ||
               url.includes("dev.to") ||
               url.includes("blog.") ||
               url.includes(".com") ||
               url.includes(".org") ||
               url.includes(".net"))
      );

      return externalUrls[0] || urls[0];
   }

   return null;
}

function cleanIssueBody(body) {
   // Remover frontmatter si existe
   const frontmatterPattern = /^---\s*\n([\s\S]*?)\n---\s*\n?/;
   let cleanedBody = body.replace(frontmatterPattern, "");

   // Remover múltiples frontmatters si existen
   while (frontmatterPattern.test(cleanedBody)) {
      cleanedBody = cleanedBody.replace(frontmatterPattern, "");
   }

   // NO escapar nada aquí, mantener el contenido tal como está para markdown
   // El contenido ya viene escapado desde el workflow

   // Limpiar espacios al inicio
   cleanedBody = cleanedBody.replace(/^\s*\n+/, "");

   // Normalizar múltiples saltos de línea
   cleanedBody = cleanedBody.replace(/\n\s*\n\s*\n/g, "\n\n");

   return cleanedBody.trim();
}

function generateExternalMarkdownContent(
   title,
   body,
   issueUrl,
   issueNumber,
   labels
) {
   const currentDate = new Date().toISOString().split("T")[0];

   // Extraer URL externa del contenido
   const externalUrl = extractExternalUrl(body);

   // Limpiar el contenido del cuerpo del issue (remover frontmatter si existe)
   const cleanBody = cleanIssueBody(body);

   // Generar tags basados en las labels (excluyendo 'content' y 'external')
   const tags = labels
      .filter(
         (label) => !["content", "external"].includes(label.name.toLowerCase())
      )
      .map((label) => label.name);

   // Template para posts externos (similar a react-suspense-by-freecodecamp.md)
   const frontmatter = `---
external: true${
      externalUrl
         ? `
url: ${externalUrl}`
         : ""
   }
title: ${title}
description: ${title}
date: ${currentDate}${
      tags.length > 0
         ? `
tags: [${tags.map((tag) => `"${tag}"`).join(", ")}]`
         : ""
   }
---

`;

   // Para posts externos, el contenido es más simple
   const content = cleanBody.trim();

   // Agregar información del issue al final
   const issueInfo = `

---

*Este post fue generado automáticamente por GitHub Actions desde el [Issue #${issueNumber}](${issueUrl}) de GitHub.*
`;

   return frontmatter + content + issueInfo;
}

function generateInternalMarkdownContent(
   title,
   body,
   issueUrl,
   issueNumber,
   labels
) {
   const currentDate = new Date().toISOString().split("T")[0];

   // Limpiar el contenido del cuerpo del issue (remover frontmatter si existe)
   const cleanBody = cleanIssueBody(body);

   // Generar tags basados en las labels (excluyendo 'content')
   const tags = labels
      .filter((label) => label.name.toLowerCase() !== "content")
      .map((label) => label.name);

   // Calcular tiempo de lectura estimado (aproximadamente 200 palabras por minuto)
   const wordCount = cleanBody.split(/\s+/).length;
   const readingMinutes = Math.max(1, Math.ceil(wordCount / 200));

   // Template para posts internos (similar a que-es-una-api.md)
   const frontmatter = `---
external: false
draft: false
title: ${title}
description: ${title}
date: ${currentDate}
readingMinutes: "${readingMinutes}"${
      tags.length > 0
         ? `
tags: [${tags.map((tag) => `"${tag}"`).join(", ")}]`
         : ""
   }
---

`;

   // Agregar información del issue al final
   const issueInfo = `

---

*Este post fue generado automáticamente por GitHub Actions desde el [Issue #${issueNumber}](${issueUrl}) de GitHub.*
`;

   return frontmatter + cleanBody + issueInfo;
}

if (require.main === module) {
   generateBlogPost();
}

module.exports = { generateBlogPost };
