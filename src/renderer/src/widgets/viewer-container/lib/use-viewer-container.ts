import { useEffect } from 'react'
import { useFetchEntities } from '../../../features/fetch-entities/lib/use-fetch-entities'

export const useViewContainer = () => {
  const { fetchEntities } = useFetchEntities()
  useEffect(() => {
    fetchEntities()
  }, [])
}
