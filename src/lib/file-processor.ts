import { Attachment } from '@/types/chat'

export interface ProcessedFile {
  name: string
  type: string
  size: number
  content: string
  error?: string
}

export async function processFile(file: File): Promise<ProcessedFile> {
  const baseInfo = {
    name: file.name,
    type: file.type,
    size: file.size,
    content: '',
  }

  try {
    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      return await processPDF(file, baseInfo)
    } else if (file.type.startsWith('text/') || isTextFile(file.name)) {
      return await processTextFile(file, baseInfo)
    } else if (file.type.startsWith('image/')) {
      return await processImage(file, baseInfo)
    } else if (isDocumentFile(file.name)) {
      return await processDocument(file, baseInfo)
    } else {
      return {
        ...baseInfo,
        content: `[File: ${file.name}]\nType: ${file.type || 'Unknown'}\nSize: ${(file.size / 1024).toFixed(1)}KB\n\nThis file has been attached but its content cannot be read directly. Please describe what you'd like me to help you with regarding this file.`,
      }
    }
  } catch (error) {
    return {
      ...baseInfo,
      content: `[Error processing file: ${file.name}]`,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

function isTextFile(filename: string): boolean {
  const textExtensions = ['.txt', '.md', '.csv', '.json', '.xml', '.html', '.css', '.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.cpp', '.c', '.h']
  return textExtensions.some(ext => filename.toLowerCase().endsWith(ext))
}

function isDocumentFile(filename: string): boolean {
  const docExtensions = ['.doc', '.docx', '.rtf', '.odt']
  return docExtensions.some(ext => filename.toLowerCase().endsWith(ext))
}

async function processDocument(file: File, baseInfo: ProcessedFile): Promise<ProcessedFile> {
  return {
    ...baseInfo,
    content: `[Document Attached: ${file.name} (${(file.size / 1024).toFixed(1)}KB)]

I can see you've uploaded a document file. While I cannot read document files directly, I can help you with:

📄 **What I can do:**
- Analyze content if you copy and paste the text
- Help with document-related questions
- Provide writing, editing, or formatting assistance
- Discuss topics covered in your document

💡 **To get help with your document:**
- Copy and paste the sections you want me to analyze
- Describe what the document is about
- Ask specific questions about the content
- Tell me what kind of help you need

What would you like me to help you with regarding this document?`,
  }
}

async function processPDF(file: File, baseInfo: ProcessedFile): Promise<ProcessedFile> {
  try {
    return {
      ...baseInfo,
      content: `[PDF Document Attached: ${file.name} (${(file.size / 1024).toFixed(1)}KB)]

I can see you've uploaded a PDF file called "${file.name}". While I cannot directly read PDF contents in this interface, I can help you in several ways:

📋 **What I can do:**
- Summarize content if you copy and paste the text
- Answer questions about specific sections you share
- Help analyze, explain, or discuss the material
- Provide insights on topics covered in the document

💡 **To get help with your PDF:**
- Copy and paste the text sections you want me to analyze
- Tell me what the chapter/document is about
- Ask specific questions about topics you're studying
- Describe what kind of summary or analysis you need

What would you like me to help you with regarding this PDF?`,
    }
  } catch (error) {
    return {
      ...baseInfo,
      content: `[PDF file: ${file.name} - Unable to process]`,
      error: error instanceof Error ? error.message : 'PDF processing error',
    }
  }
}

async function processTextFile(file: File, baseInfo: ProcessedFile): Promise<ProcessedFile> {
  try {
    const text = await file.text()
    
    // Truncate very large text files
    const maxLength = 10000 // 10KB of text
    if (text.length > maxLength) {
      return {
        ...baseInfo,
        content: `[Text File: ${file.name}]\n\n${text.substring(0, maxLength)}\n\n[Note: This file was truncated as it's very large. Only the first ${maxLength} characters are shown.]`,
      }
    }
    
    return {
      ...baseInfo,
      content: `[Text File: ${file.name}]\n\n${text}`,
    }
  } catch (error) {
    return {
      ...baseInfo,
      content: `[Text File: ${file.name} - Error reading file]`,
      error: error instanceof Error ? error.message : 'Text processing error',
    }
  }
}

async function processImage(file: File, baseInfo: ProcessedFile): Promise<ProcessedFile> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve({
        ...baseInfo,
        content: `[Image Attached: ${file.name} (${(file.size / 1024).toFixed(1)}KB)]

I can see you've uploaded an image file. While I cannot view images directly in this interface, I can help you with:

🖼️ **What I can do:**
- Discuss topics related to your image if you describe it
- Help with image-related questions or analysis
- Provide guidance on visual concepts
- Assist with design, photography, or technical questions

💡 **To get help with your image:**
- Describe what the image shows
- Tell me what you'd like to know about it
- Ask specific questions about the content
- Let me know what kind of analysis you need

What would you like me to help you with regarding this image?`,
      })
    }
    reader.onerror = () => {
      resolve({
        ...baseInfo,
        content: `[Image: ${file.name} - Could not process]`,
        error: 'Failed to read image file',
      })
    }
    reader.readAsDataURL(file)
  })
}

export function createFileAttachment(file: File): Attachment {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
  }
}
