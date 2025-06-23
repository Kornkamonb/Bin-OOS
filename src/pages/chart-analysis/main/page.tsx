import { use_feature } from "../hooks/use_feature";
import YearlyChart from "@/pages/chart-analysis/components/yearly_chart";
import MonthlyChart from "@/pages/chart-analysis/components/monthly_chart";

const Chart_analysis = () => {
  const { reqSummary, reqRecord, reqJob } = use_feature();

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-5 gap-4 items-center">
          <div className="chart-section col-span-3">
            <YearlyChart
              data={reqRecord}
              chartId="department-B-chart"
              title="Summary Yearly Performance"
            />
          </div>
          <div className="chart-section col-span-2">
            <MonthlyChart
              data={reqSummary}
              chartId="department-a-chart"
              title=" Monthly Job Type"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart_analysis;
