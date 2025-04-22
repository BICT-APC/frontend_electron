export const playerHook = () => {
  // const { selectedCctvId } = cctvSelectStore()
  // const [prevSelectedCctvId, setPrevSelectedCctvId] = useState<number | null>()
  // const [streamUrl, setStreamUrl] = useState<string | null>(null)
  // const { width = 0, height = 0 } = useResizeObserver({ ref })

  // useEffect(() => {
  //   if (width === 0 && height === 0) return
  //   if (prevSelectedCctvId === selectedCctvId) return
  //   setPrevSelectedCctvId(selectedCctvId)
  //   const url = `${HUMAN_DETECT_MODULE_URL}${GET_STREAM}?cctv_id=${cctvId}&width=${width.toFixed()}&height=${height.toFixed()}`
  //   console.log(url)
  //   setStreamUrl(url)
  // }, [selectedCctvId, prevSelectedCctvId, width, height, cctvId])

  return {
    // streamUrl,
  }
}
