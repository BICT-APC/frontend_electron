// import React, { useState } from "react";
// import styles from "./graph.module.css";
// // import { fetchCctvFull } from "../../shared/api/cctv/cctv.service";

// const getDefaultInitialTime = () => {
//   const now = new Date();
//   const formatLocalTime = (date: Date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     const hours = String(date.getHours()).padStart(2, "0");
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     return `${year}-${month}-${day}T${hours}:${minutes}`;
//   };
//   return {
//     startTime: formatLocalTime(new Date(now.setHours(9, 0, 0, 0))),
//     endTime: formatLocalTime(new Date(now.setHours(18, 0, 0, 0))),
//   };
// };

// const getInitialTime = (cameraId: number, currentStart?: string, currentEnd?: string) => {
//   const savedDefault = localStorage.getItem(`defaultTimeRange_camera_${cameraId}`);
//   const now = new Date();
//   const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

//   if (savedDefault) {
//     const { startTime, endTime } = JSON.parse(savedDefault);
//     const baseStartDate = currentStart ? currentStart.split("T")[0] : today;
//     const baseEndDate = currentEnd ? currentEnd.split("T")[0] : today;
//     return {
//       startTime: `${baseStartDate}T${startTime}`,
//       endTime: `${baseEndDate}T${endTime}`,
//     };
//   }
//   return getDefaultInitialTime();
// };

// export const Graph: React.FC = () => {
//   // const { cctvFull, setCctvFull, setTimeRange } = useAppStore(); // setTimeRange 추가
//   const [selectedCameraId, _setSelectedCameraId] = useState<number>(1);
//   const [timeRange, _setTimeRangeLocal] = useState(getInitialTime(1));
//   const [tempTimeRange, _setTempTimeRange] = useState(getInitialTime(1));
//   const [defaultTimeRange, setDefaultTimeRange] = useState(getInitialTime(1));

//   // useEffect(() => {
//   //   const initialTime = getInitialTime(selectedCameraId, tempTimeRange.startTime, tempTimeRange.endTime);
//   //   setTimeRangeLocal(initialTime);
//   //   setTempTimeRange(initialTime);
//   //   setDefaultTimeRange(initialTime);
//   //   setTimeRange(initialTime); // 전역 상태에 저장
//   //   fetchCctvFull(initialTime.startTime, initialTime.endTime).then((data) => {
//   //     setCctvFull(data);
//   //   });
//   // }, [selectedCameraId, setCctvFull, setTimeRange]);

//   // const selectedCamera = cctvFull.find((camera) => camera.id === selectedCameraId);
//   // const logs = selectedCamera?.apcLogs || [];
//   // const totalStats = selectedCamera?.totalStats || { inCount: 0, outCount: 0, occupancy: 0 };

//   // const handleTimeChange = (field: "startTime" | "endTime", value: string) => {
//   //   setTempTimeRange((prev) => ({
//   //     ...prev,
//   //     [field]: value,
//   //   }));
//   // };

//   const handleDefaultTimeChange = (field: "startTime" | "endTime", value: string) => {
//     const today = new Date().toISOString().slice(0, 10);
//     setDefaultTimeRange((prev) => ({
//       ...prev,
//       [field]: `${today}T${value}`,
//     }));
//   };

//   // const handleSaveDefault = () => {
//   //   const startHour = defaultTimeRange.startTime.split("T")[1];
//   //   const endHour = defaultTimeRange.endTime.split("T")[1];
//   //   if (new Date(`1970-01-01T${startHour}`) > new Date(`1970-01-01T${endHour}`)) {
//   //     alert("기본 시작 시간이 종료 시간보다 늦습니다.");
//   //     return;
//   //   }
//   //   const savedDefault = { startTime: startHour, endTime: endHour };
//   //   localStorage.setItem(`defaultTimeRange_camera_${selectedCameraId}`, JSON.stringify(savedDefault));
//   //   alert(`Camera ${selectedCameraId}의 기본 시간이 저장되었습니다.`);
//   //   const newInitialTime = getInitialTime(selectedCameraId, tempTimeRange.startTime, tempTimeRange.endTime);
//   //   setTempTimeRange(newInitialTime);
//   //   setTimeRangeLocal(newInitialTime);
//   //   setTimeRange(newInitialTime); // 전역 상태 업데이트
//   //   fetchCctvFull(newInitialTime.startTime, newInitialTime.endTime).then((data) => {
//   //     setCctvFull(data);
//   //   });
//   // };

//   // const handleSearch = () => {
//   //   if (new Date(tempTimeRange.startTime) > new Date(tempTimeRange.endTime)) {
//   //     alert("시작 시간이 종료 시간보다 늦습니다.");
//   //     return;
//   //   }
//   //   setTimeRangeLocal(tempTimeRange);
//   //   setTimeRange(tempTimeRange); // 전역 상태에 저장
//   //   fetchCctvFull(tempTimeRange.startTime, tempTimeRange.endTime).then((data) => {
//   //     setCctvFull(data);
//   //   });
//   // };

//   console.log("Rendered timeRange:", timeRange);
//   console.log("Rendered tempTimeRange:", tempTimeRange);
//   console.log("Rendered defaultTimeRange:", defaultTimeRange);

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>APC Counting Stats</h2>
//       <div className={styles.tabWrapper}>
//         {/* {cctvFull.map((camera) => (
//           <button
//             key={camera.id}
//             className={`${styles.tabButton} ${
//               selectedCameraId === camera.id ? styles.activeTab : ""
//             }`}
//             onClick={() => setSelectedCameraId(camera.id)}
//           >
//             {camera.name}
//           </button>
//         ))} */}
//       </div>

//       <div className={styles.defaultTimeWrapper}>
//         <h3 className={styles.subtitle}>작업 시간 설정 (Camera {selectedCameraId})</h3>
//         <div className={styles.timeInput}>
//           <label className={styles.label}>작업 시작 시간:</label>
//           <input
//             type="time"
//             value={defaultTimeRange.startTime.split("T")[1]}
//             onChange={(e) => handleDefaultTimeChange("startTime", e.target.value)}
//             className={styles.input}
//           />
//         </div>
//         <div className={styles.timeInput}>
//           <label className={styles.label}>작업 종료 시간:</label>
//           <input
//             type="time"
//             value={defaultTimeRange.endTime.split("T")[1]}
//             onChange={(e) => handleDefaultTimeChange("endTime", e.target.value)}
//             className={styles.input}
//           />
//         </div>
//         {/* <button className={styles.saveButton} onClick={handleSaveDefault}>
//           기본값 저장
//         </button> */}
//       </div>

//       <div className={styles.timeInputWrapper}>
//         <div className={styles.timeInput}>
//           <label className={styles.label}>시작 시간:</label>
//           {/* <input
//             type="datetime-local"
//             value={tempTimeRange.startTime}
//             onChange={(e) => handleTimeChange("startTime", e.target.value)}
//             className={styles.input}
//           /> */}
//         </div>
//         <div className={styles.timeInput}>
//           <label className={styles.label}>종료 시간:</label>
//           {/* <input
//             type="datetime-local"
//             value={tempTimeRange.endTime}
//             onChange={(e) => handleTimeChange("endTime", e.target.value)}
//             className={styles.input}
//           /> */}
//         </div>
//         {/* <button className={styles.searchButton} onClick={handleSearch}>
//           조회
//         </button> */}
//       </div>

//       <table className={styles.timeTable}>
//         <thead>
//           <tr>
//             <th className={styles.th}>시작시간</th>
//             <th className={styles.th}>종료시간</th>
//           </tr>
//           <tr>
//             {/* <td className={styles.td}>{timeRange.ime}</td> */}
//           </tr>
//         </thead>
//       </table>

//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th className={styles.th}>시간</th>
//             <th className={styles.th}>IN</th>
//             <th className={styles.th}>OUT</th>
//             <th className={styles.th}>재실자</th>
//           </tr>
//           {/* <tr
//             className={`${styles.tr} ${
//               totalStats.occupancy > 0 ? styles.activeTotal : styles.noOccupancyTotal
//             }`}
//           >
//             <td className={styles.td}>total</td>
//             <td className={styles.td}>{totalStats.inCount}</td>
//             <td className={styles.td}>{totalStats.outCount}</td>
//             <td className={styles.td}>{totalStats.occupancy}</td>
//           </tr> */}
//         </thead>
//         <tbody>
//           {/* {logs.map((log, index) => (
//             <tr key={index} className={styles.tr}>
//               <td className={styles.td}>{log.eventedDateTime}</td>
//               <td className={styles.td}>{log.inCount ?? "N/A"}</td>
//               <td className={styles.td}>{log.outCount ?? "N/A"}</td>
//               <td className={styles.td}>{log.occupancy ?? "N/A"}</td>
//             </tr>
//           ))}
//           {logs.length === 0 && (
//             <tr>
//               <td colSpan={4} className={styles.td}>
//                 해당 시간대에 로그가 없습니다.
//               </td>
//             </tr>
//           )} */}
//         </tbody>
//       </table>
//     </div>
//   );
// };
