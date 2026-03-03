'use client'
// Must be called client-side only

export async function exportToPDF(elementId: string, filename: string) {
  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ])

  const element = document.getElementById(elementId)
  if (!element) throw new Error(`Element #${elementId} not found`)

  // Temporarily ensure white background for export
  const original = element.style.background
  element.style.background = '#ffffff'

  const canvas = await html2canvas(element, {
    scale:           3,    // 3x for crisp PDF
    useCORS:         true,
    allowTaint:      false,
    logging:         false,
    backgroundColor: '#ffffff',
    windowWidth:     794,
  })

  element.style.background = original

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit:        'mm',
    format:      'a4',
    compress:    true,
  })

  const pageWidth  = pdf.internal.pageSize.getWidth()   // 210mm
  const pageHeight = pdf.internal.pageSize.getHeight()  // 297mm
  const imgWidth   = pageWidth
  const imgHeight  = (canvas.height * imgWidth) / canvas.width

  // Multi-page support
  let position = 0
  const imgData = canvas.toDataURL('image/png', 1.0)

  if (imgHeight <= pageHeight) {
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
  } else {
    let remainingHeight = imgHeight
    while (remainingHeight > 0) {
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      remainingHeight -= pageHeight
      position -= pageHeight
      if (remainingHeight > 0) pdf.addPage()
    }
  }

  pdf.save(`${filename}.pdf`)
}

export async function exportToPNG(elementId: string, filename: string) {
  const { default: html2canvas } = await import('html2canvas')

  const element = document.getElementById(elementId)
  if (!element) throw new Error(`Element #${elementId} not found`)

  const canvas = await html2canvas(element, {
    scale:           2,
    useCORS:         true,
    backgroundColor: '#ffffff',
  })

  const link      = document.createElement('a')
  link.download   = `${filename}.png`
  link.href       = canvas.toDataURL('image/png')
  link.click()
}
