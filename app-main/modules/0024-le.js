
var le = {
    fileBytes: 8388608,
    textBytes: 200000,
    pages: 4,
    files: 10,
    storeBytes: 268435456,
    timeoutMs: 20000,
  },
  vr = {
    size: "Choose a file smaller than 8 MB.",
    type: "Supported files: PNG, JPEG, WebP, GIF, PDF, DOCX, XLSX, PPTX, and UTF-8 text/code. Executables, SVGs, macro documents and archives are not supported.",
    pages: "PDFs can have up to 4 pages. Split this PDF into smaller files and try again.",
    text: "This document contains too much text. Keep extracted text below 200 KB or split the file.",
    image: "This image is too large or damaged. Use an image under 4096 pixels per side and 12 megapixels.",
    document: "This file could not be read safely. Use an unencrypted supported file or export it as text.",
    busy: "Another file is being prepared. Wait a moment and try again.",
    timeout: "Preparing this file took too long. Use a smaller file and try again.",
    storage:
      "Local attachment storage is full. Remove unused attachment files or use a project file instead.",
    total:
      "Keep attachments below 200 KB of extracted text and four images per message. Split larger uploads across chats.",
    changed: "The chat changed while files were being prepared. Add them again in the intended chat.",
  };