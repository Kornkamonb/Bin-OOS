import { useEffect, useState, useMemo } from "react";
import Plot from "react-plotly.js";

interface ChartData {
  req_to_job: string;
  month: string;
  finished: number | string;
  ongoing: number | string;
  total: number | string;
}

interface Monthly_ChartProps {
  data: ChartData[];
  chartId: string;
  title?: string;
}

const MonthlyChart = ({
  data,
  title = "Monthly Records Overview",
}: Monthly_ChartProps) => {
  if (data && data.length === 0) {
    return <>NOT FOUND</>;
  }
  const [selectedMonth, setSelectedMonth] = useState<string>("2024-10");
  const [filteredData, setFilteredData] = useState<ChartData[]>(data);
  const [showDropdown, setShowDropdown] = useState(false);

  // Get unique months for autocomplete
  const uniqueMonths = useMemo(
    () => Array.from(new Set(data.map((item) => item.month))).sort(),
    [data]
  );

  // Filter months based on input
  const filteredMonths = uniqueMonths.filter((month) =>
    month.toLowerCase().includes(selectedMonth.toLowerCase())
  );

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    if (selectedMonth && uniqueMonths.includes(selectedMonth)) {
      const filtered = data.filter((item) => item.month === selectedMonth);
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [selectedMonth, data]);

  useEffect(() => {
    if (selectedMonth !== "" || null) {
      setSelectedMonth(selectedMonth);
    } else {
      setSelectedMonth("2024-10");
    }
  }, [selectedMonth]);

  const { plotData, layout } = useMemo(() => {
    if (!filteredData || filteredData.length === 0) {
      return { plotData: [], layout: {} };
    }

    const job = filteredData.map((item) => item.req_to_job);
    const finished = filteredData.map((item) => Number(item.finished));
    const ongoing = filteredData.map((item) => Number(item.ongoing));
    const total = filteredData.map((item) => Number(item.total));

    const traceFinished = {
      x: job,
      y: finished,
      name: "Finished",
      type: "bar" as const,
      marker: {
        color: "#5DE2E7",
        opacity: 0.8,
      },
      text: finished.map(String),
      textposition: "auto" as const,
      textfont: {
        color: "white",
        size: 15,
        family: "Inter, system-ui, sans-serif",
      },
    };

    const traceOngoing = {
      x: job,
      y: ongoing,
      name: "Ongoing",
      type: "bar" as const,
      marker: {
        color: "#f59e0b",
        opacity: 0.8,
      },
      text: ongoing.map(String),
      textposition: "auto" as const,
      textfont: {
        color: "white",
        size: 15,
        family: "Inter, system-ui, sans-serif",
      },
    };

    const traceTotal = {
      x: job,
      y: total,
      name: "Total",
      type: "scatter" as const,
      mode: "lines+markers+text" as const,
      marker: {
        color: "#3b82f6",
        size: 6,
        line: {
          color: "#1d4ed8",
          width: 1,
        },
      },
      line: {
        width: 2.5,
        color: "#3b82f6",
        shape: "spline" as const,
      },
      text: total.map(String),
      textposition: "top center" as const,
      textfont: {
        color: "#1f2937",
        size: 15,
        family: "Inter, system-ui, sans-serif",
        weight: "bold",
      },
      yaxis: "y",
    };

    const plotData = [traceFinished, traceOngoing, traceTotal];

    const layout = {
      barmode: "stack" as const,
      bargap: 0.3, // Add this line - controls gap between bar groups (0-1, where 0.3 = 30% gap)
      bargroupgap: 0.2, // Optional - controls gap between bars within a group
      title: {
        text: title,
        font: {
          family: "Inter, system-ui, sans-serif",
          size: 22,
          color: "#1f2937",
        },
        x: 0.5,
        xanchor: "center" as const,
        pad: { t: 20, b: 20 },
      },

      xaxis: {
        title: {
          text: "Job Type",
          font: {
            family: "Inter, system-ui, sans-serif",
            size: 15,
            color: "#6b7280",
            weight: 500,
          },
          standoff: 20,
        },
        tickangle: -20,
        tickfont: {
          family: "Inter, system-ui, sans-serif",
          size: 15,
          color: "#6b7280",
        },

        gridcolor: "#f3f4f6",
        gridwidth: 1,
        showline: true,
        linecolor: "#e5e7eb",
        linewidth: 1,
      },
      yaxis: {
        title: {
          text: "Number of Records",
          font: {
            family: "Inter, system-ui, sans-serif",
            size: 13,
            color: "#6b7280",
            weight: 500,
          },
          standoff: 20,
        },
        rangemode: "tozero" as const,
        tickfont: {
          family: "Inter, system-ui, sans-serif",
          size: 11,
          color: "#6b7280",
        },
        gridcolor: "#f3f4f6",
        gridwidth: 1,
        showline: true,
        linecolor: "#e5e7eb",
        linewidth: 1,
        zeroline: true,
        zerolinecolor: "#d1d5db",
        zerolinewidth: 1,
      },
      legend: {
        orientation: "v" as const,
        x: 1.02,
        y: 0.5,
        xanchor: "left" as const,
        yanchor: "top" as const,
        font: {
          family: "Inter, system-ui, sans-serif",
          size: 12,
          color: "#374151",
        },
        bgcolor: "rgba(255,255,255,0)",
        borderwidth: 0,
      },
      plot_bgcolor: "#ffffff",
      paper_bgcolor: "#ffffff",
      margin: {
        l: 60,
        r: 40,
        t: 80,
        b: 80,
      },
      hovermode: "x unified" as const,
      hoverlabel: {
        bgcolor: "#1f2937",
        bordercolor: "#374151",
        font: {
          family: "Inter, system-ui, sans-serif",
          size: 12,
          color: "white",
        },
      },
    };

    return { plotData, layout };
  }, [filteredData, title]);

  const config = {
    responsive: true,
    displayModeBar: false,
    showTips: false,
  };

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setShowDropdown(false);
  };

  const clearFilter = () => {
    setSelectedMonth("");
    setShowDropdown(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Month Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Month
        </label>
        <div className="relative w-64">
          <input
            type="text"
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search or select month..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          {/* Clear button */}
          {selectedMonth && (
            <button
              onClick={clearFilter}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}

          {/* Dropdown arrow */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            ▼
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredMonths.length > 0 ? (
                <>
                  <button
                    onClick={clearFilter}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 text-gray-500 italic border-b"
                  >
                    Show All Months
                  </button>
                  {filteredMonths.map((month) => (
                    <button
                      key={month}
                      onClick={() => handleMonthSelect(month)}
                      className="w-full px-3 py-2 text-left hover:bg-blue-50 hover:text-blue-700"
                    >
                      {month}
                    </button>
                  ))}
                </>
              ) : (
                <div className="px-3 py-2 text-gray-500">No months found</div>
              )}
            </div>
          )}
        </div>

        {/* Selected filter indicator */}
        {selectedMonth && uniqueMonths.includes(selectedMonth) && (
          <div className="mt-2 flex items-center">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {selectedMonth}
              <button
                onClick={clearFilter}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                ✕
              </button>
            </span>
          </div>
        )}
      </div>

      {/* Chart */}
      {filteredData && filteredData.length > 0 ? (
        <Plot
          data={plotData}
          layout={layout}
          config={config}
          className="w-full min-h-[600px]"
          useResizeHandler={true}
          style={{ width: "100%", height: "600px" }}
        />
      ) : (
        <div className="w-full min-h-[600px] flex items-center justify-center text-gray-500">
          No data available for the selected filter
        </div>
      )}
    </div>
  );
};

export default MonthlyChart;
