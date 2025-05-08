import { useResetTime } from '../lib/use-reset-time'
import { useResetCount } from '../lib/use-reset-count'
import styles from './apc-config-view.module.css'

interface ApcConfigViewProps {
  areaId: number
}

export const ApcConfigView = ({ areaId }: ApcConfigViewProps) => {
  const {
    hours,
    minutes,
    seconds,
    saveMessage: resetTimeSaveMessage,
    setHours,
    setMinutes,
    setSeconds,
    handleSaveResetTime,
    handleInputChange
  } = useResetTime({ areaId })

  const {
    countIn,
    countOut,
    countTotal,
    saveMessage: apcCountSaveMessage,
    setCountIn,
    setCountOut,
    setCountTotal,
    onChangeApcCount,
    saveApcCount
  } = useResetCount({ areaId })

  return (
    <div className={styles.configContainer}>
      <div className={styles.countGroup}>
        <div className={styles.countItem}>
          <span className={styles.countLabel}>Area ID:</span>
          <input className={styles.countValue} value={areaId} disabled />
        </div>
        <div className={styles.countItem}>
          <span className={styles.countLabel}>In:</span>
          <input
            className={styles.countValue}
            value={countIn}
            onChange={(e) => onChangeApcCount(e, setCountIn)}
            type="number"
            min="0"
          />
        </div>
        <div className={styles.countItem}>
          <span className={styles.countLabel}>Out:</span>
          <input
            className={styles.countValue}
            value={countOut}
            onChange={(e) => onChangeApcCount(e, setCountOut)}
            type="number"
            min="0"
          />
        </div>
        <div className={styles.countItem}>
          <span className={styles.countLabel}>Total:</span>
          <input
            className={styles.countValue}
            value={countTotal}
            onChange={(e) => onChangeApcCount(e, setCountTotal)}
            type="number"
            min="0"
          />
        </div>
        <button className={styles.saveButton} onClick={saveApcCount}>
          APC 카운터 저장
        </button>

        {apcCountSaveMessage && <div className={styles.saveMessage}>{apcCountSaveMessage}</div>}
      </div>

      <div className={styles.resetTimeSection}>
        <div className={styles.resetTimeHeader}>APC 리셋 시간 설정</div>
        <div className={styles.resetTimeDescription}>
          매일 지정된 시간에 APC 카운터가 0으로 초기화됩니다.
        </div>

        <div className={styles.timeInputContainer}>
          <div className={styles.timeInputGroup}>
            <label htmlFor="hours" className={styles.timeInputLabel}>
              시
            </label>
            <input
              id="hours"
              type="number"
              min="0"
              max="23"
              value={hours}
              onChange={(e) => handleInputChange(e, setHours, 23)}
              className={styles.timeInput}
            />
          </div>
          <span className={styles.timeSeparator}>:</span>
          <div className={styles.timeInputGroup}>
            <label htmlFor="minutes" className={styles.timeInputLabel}>
              분
            </label>
            <input
              id="minutes"
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => handleInputChange(e, setMinutes, 59)}
              className={styles.timeInput}
            />
          </div>
          <span className={styles.timeSeparator}>:</span>
          <div className={styles.timeInputGroup}>
            <label htmlFor="seconds" className={styles.timeInputLabel}>
              초
            </label>
            <input
              id="seconds"
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => handleInputChange(e, setSeconds, 59)}
              className={styles.timeInput}
            />
          </div>
        </div>

        <button className={styles.saveButton} onClick={handleSaveResetTime}>
          리셋 시간 저장
        </button>

        {resetTimeSaveMessage && <div className={styles.saveMessage}>{resetTimeSaveMessage}</div>}
      </div>
    </div>
  )
}
