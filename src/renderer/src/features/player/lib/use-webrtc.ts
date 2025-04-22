import { useEffect, useRef } from 'react'
import { IonSFUJSONRPCSignal } from 'ion-sdk-js/lib/signal/json-rpc-impl'
import { SFU_SERVER, TURN_SERVER } from '@renderer/shared/constants/paths'
import Client from 'ion-sdk-js/lib/client'
import { RemoteStream } from 'ion-sdk-js/lib/stream'

class KeepAliveSignal extends IonSFUJSONRPCSignal {
  get ws(): WebSocket {
    return this.socket
  }
}

export const useWebRTC = (cctvId: number) => {
  const peerId = useRef('viewer-' + Math.random().toString(36).substring(2, 10))
  const clientRef = useRef<Client | undefined>(undefined)
  const signalRef = useRef<IonSFUJSONRPCSignal | undefined>(undefined)
  const streamRef = useRef<RemoteStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const pingTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const videoEl = videoRef.current
    const run = async () => {
      const signal = new KeepAliveSignal(`ws://${SFU_SERVER}`)
      signalRef.current = signal

      pingTimerRef.current = setInterval(() => {
        if (signal.ws?.readyState === WebSocket.OPEN) {
          signal.ws.send(JSON.stringify({ id: 0, method: 'ping' }))
        }
      }, 15000)

      const client = new Client(signal, {
        codec: 'vp8',
        iceServers: [
          {
            urls: `turn:${TURN_SERVER}?transport=tcp`,
            username: 'webrtc',
            credential: 'webrtc'
          }
        ],
        iceTransportPolicy: 'relay'
      })
      clientRef.current = client

      signal.onopen = async () => {
        try {
          await client.join(`${cctvId}`, peerId.current)
          console.log('✅ 방 참가 완료')
        } catch (e) {
          console.error('❌ 방 참가 실패:', e)
        }
      }

      signal.onerror = (e) => console.error('❌ WebSocket 오류:', e)
      signal.onclose = (e) => console.warn('🚫 WebSocket 종료:', e)

      client.ontrack = (_track, stream) => {
        streamRef.current = stream

        // unmute
        stream.getTracks().forEach((t) => {
          try {
            stream.unmute(t.kind as 'video' | 'audio')
          } catch (err) {
            console.warn(`unmute 실패: ${err}`)
          }
        })

        // Simulcast 수신 우선 레이어 설정 (있는 경우에만)
        stream.preferLayer?.('high')

        const videoEl = videoRef.current
        if (videoEl) {
          videoEl.srcObject = stream
          videoEl.play().catch((err) => console.error('❌ 비디오 재생 실패:', err))
        }
      }
    }

    run()

    return () => {
      clientRef.current?.close()
      signalRef.current?.close()
      if (pingTimerRef.current) {
        clearInterval(pingTimerRef.current)
      }
      if (videoEl) {
        videoEl.srcObject = null
      }
      streamRef.current = null
    }
  }, [cctvId])

  const setPreferredLayer = (layer: 'low' | 'medium' | 'high') => {
    streamRef.current?.preferLayer?.(layer)
  }

  return {
    videoRef,
    setPreferredLayer
  }
}
