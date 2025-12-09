// EmotionChart.tsx - 감정 차트 (recharts)
interface EmotionChartProps {
  data: EmotionChartData[];
  type: 'bar' | 'line' | 'pie';
}
// EmotionMindMap.tsx - 감정 마인드맵
interface EmotionMindMapProps {
  emotions: EmotionNode[];
  onNodeClick?: (nodeId: string) => void;
}

// RelationshipChart.tsx - 관계별 감정 차트
interface RelationshipChartProps {
  data: RelationshipEmotionData[];
}

// MonthlyReport.tsx - 월말 감정 리포트
interface MonthlyReportProps {
  month: Date;
  report: MonthlyReportData;
  onDownload: () => void;
}