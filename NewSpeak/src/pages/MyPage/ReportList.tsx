import React from 'react';
import styles from './ReportList.module.scss';

// 임시 데이터
const reportData = {
  count: 10,
  data: [
    { id: 1, content: '첫 번째 보고서 내용' },
    { id: 2, content: '두 번째 보고서 내용' },
    { id: 3, content: '세 번째 보고서 내용' },
    { id: 4, content: '네 번째 보고서 내용' },
    { id: 5, content: '다섯 번째 보고서 내용' },
    { id: 6, content: '여섯 번째 보고서 내용' },
    { id: 7, content: '일곱 번째 보고서 내용' },
    { id: 8, content: '여덟 번째 보고서 내용' },
    { id: 9, content: '아홉 번째 보고서 내용' },
    { id: 10, content: '열 번째 보고서 내용' },
  ],
};

const ReportList = () => {
  return (
    <div className={styles.reportList}>
      {reportData.data.map(report => (
        <div key={report.id} className={styles.reportItem}>
          <h3>Report {report.id}</h3>
          <p>{report.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ReportList;
