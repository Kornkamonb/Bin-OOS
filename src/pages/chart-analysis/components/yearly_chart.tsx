import { useMemo } from "react";
import Plot from "react-plotly.js";

interface ChartData {
  month: string;
  finished: number | string;
  ongoing: number | string;
  total: number | string;
}

interface YearlyChartProps {
  data: ChartData[];
  chartId: string;
  title?: string;
}

const YearlyChart = ({
  data,
  title = "Monthly Records Overview",
}: YearlyChartProps) => {
  const { plotData, layout } = useMemo(() => {
    if (!data || data.length === 0) {
      return { plotData: [], layout: {} };
    }

    const months = data.map((item) => item.month);
    const finished = data.map((item) => Number(item.finished));
    const ongoing = data.map((item) => Number(item.ongoing));
    const total = data.map((item) => Number(item.total));

    const traceFinished = {
      x: months,
      y: finished,
      name: "Finished",
      type: "bar" as const,
      marker: {
        color: "#10b981",
        opacity: 0.8,
      },
      text: finished.map((val) => (val > 0 ? String(val) : "")),
      textposition: "inside" as const,
      textfont: {
        color: "white",
        size: 15,
        family: "Inter, system-ui, sans-serif",
      },
      hovertemplate:
        "<b>%{fullData.name}</b><br>" +
        "Month: %{x}<br>" +
        "Count: %{y}<br>" +
        "<extra></extra>",
    };

    const traceOngoing = {
      x: months,
      y: ongoing,
      name: "Ongoing",
      type: "bar" as const,
      marker: {
        color: "#f59e0b",
        opacity: 0.8,
      },
      text: ongoing.map((val) => (val > 0 ? String(val) : "")),
      textposition: "inside" as const,
      textfont: {
        color: "white",
        size: 12,
        family: "Inter, system-ui, sans-serif",
      },
      hovertemplate:
        "<b>%{fullData.name}</b><br>" +
        "Month: %{x}<br>" +
        "Count: %{y}<br>" +
        "<extra></extra>",
    };

    const traceTotal = {
      x: months,
      y: total,
      name: "Total",
      type: "scatter" as const,
      mode: "lines+markers+text" as const,
      marker: {
        color: "#3b82f6",
        size: 8,
        line: {
          color: "#1d4ed8",
          width: 2,
        },
      },
      line: {
        width: 3,
        color: "#3b82f6",
        shape: "spline" as const,
      },
      text: total.map(String),
      textposition: "top center" as const,
      textfont: {
        color: "#1f2937",
        size: 11,
        family: "Inter, system-ui, sans-serif",
        weight: "bold",
      },
      yaxis: "y",
      hovertemplate:
        "<b>%{fullData.name}</b><br>" +
        "Month: %{x}<br>" +
        "Count: %{y}<br>" +
        "<extra></extra>",
    };

    const plotData = [traceFinished, traceOngoing, traceTotal];

    const layout = {
      barmode: "stack" as const,
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
          text: "Month",
          font: {
            family: "Inter, system-ui, sans-serif",
            size: 14,
            color: "#6b7280",
          },
          standoff: 25,
        },
        tickangle: -90,
        tickfont: {
          family: "Inter, system-ui, sans-serif",
          size: 12,
          color: "#6b7280",
        },
        tickmode: "array" as const,
        tickvals: months,
        ticktext: months,
        gridcolor: "#f3f4f6",
        gridwidth: 1,
        showline: true,
        linecolor: "#e5e7eb",
        linewidth: 1,
        automargin: true,
      },
      yaxis: {
        title: {
          text: "Number of Records",
          font: {
            family: "Inter, system-ui, sans-serif",
            size: 14,
            color: "#6b7280",
          },
          standoff: 25,
        },
        rangemode: "tozero" as const,
        tickfont: {
          family: "Inter, system-ui, sans-serif",
          size: 12,
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
        automargin: true,
      },
      legend: {
        orientation: "v" as const,
        x: 1.05,
        y: 0.5,
        xanchor: "center" as const,
        yanchor: "top" as const,
        font: {
          family: "Inter, system-ui, sans-serif",
          size: 13,
          color: "#374151",
        },
        bgcolor: "rgba(255,255,255,0.9)",
        bordercolor: "#e5e7eb",
        borderwidth: 1,
      },
      plot_bgcolor: "#ffffff",
      paper_bgcolor: "#ffffff",
      margin: {
        l: 80,
        r: 60,
        t: 100,
        b: 120,
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
      showlegend: true,
    };

    return { plotData, layout };
  }, [data, title]);

  const config = {
    responsive: true,
    displayModeBar: false,
    showTips: false,
    autosizable: true,
  };

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="w-full min-h-[650px] flex items-center justify-center text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <Plot
        data={plotData}
        layout={layout}
        config={config}
        className="w-full min-h-[650px]"
        useResizeHandler={true}
        style={{ width: "100%", height: "650px" }}
      />
    </div>
  );
};

export default YearlyChart;
