self.onmessage = async (e) => {
  const { streamUrl } = e.data

  try {
    const response = await fetch(streamUrl)
    const reader = response.body?.getReader()
    if (!reader) return

    let jpegBuffer: number[] = []
    let insideImage = false

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (!value) continue

      for (let i = 0; i < value.length; i++) {
        const byte = value[i]

        // SOI marker
        if (!insideImage && byte === 0xff && value[i + 1] === 0xd8) {
          insideImage = true
          jpegBuffer = [0xff, 0xd8]
          i++ // skip next byte
          continue
        }

        if (insideImage) {
          jpegBuffer.push(byte)

          // EOI marker
          if (
            jpegBuffer.length >= 2 &&
            jpegBuffer[jpegBuffer.length - 2] === 0xff &&
            jpegBuffer[jpegBuffer.length - 1] === 0xd9
          ) {
            // Got full JPEG
            insideImage = false

            try {
              const blob = new Blob([new Uint8Array(jpegBuffer)], { type: 'image/jpeg' })
              const bitmap = await createImageBitmap(blob)
              postMessage({ bitmap })
            } catch (err) {
              console.warn('❌ 이미지 디코딩 실패', err)
            }

            jpegBuffer = []
          }
        }
      }
    }
  } catch (err) {
    console.error('❌ 스트림 처리 중 에러 발생', err)
  }
}
