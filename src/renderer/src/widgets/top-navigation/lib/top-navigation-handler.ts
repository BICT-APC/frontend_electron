import { useCallback } from 'react'
import { getRefresh } from '../../../shared/api'
import { useFetchEntities } from '../../../features/fetch-entities/lib/use-fetch-entities'

export const topNavigationHandler = () => {
  const { fetchEntities } = useFetchEntities()

  const pomitDbSyncHandler = useCallback(() => {
    const dbSync = async () => {
      try {
        const refreshResults = await getRefresh()
        console.log(refreshResults)
        await fetchEntities()
      } catch (error) {
        console.error(error)
      }
    }

    dbSync()
  }, [])

  return { pomitDbSyncHandler }
}
