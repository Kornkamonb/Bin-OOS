import { useEffect } from "react";
import Plotly from "plotly.js-dist";
import { use_feature } from "../hooks/use_feature";

const Chart_analysis = () => {
  const { reqRecord } = use_feature();

  useEffect(() => {
    if (!reqRecord?.data || reqRecord.data.length === 0) return;

    const months = reqRecord.data.map((item) => item.month);
    const finished = reqRecord.data.map((item) => Number(item.finished));
    const ongoing = reqRecord.data.map((item) => Number(item.ongoing));
    const total = reqRecord.data.map((item) => Number(item.total));

    const traceFinished = {
      x: months,
      y: finished,
      name: "Finished",
      type: "bar",
      marker: {
        color: "#10b981",
        opacity: 0.8,
      },
      text: finished.map(String),
      textposition: "auto",
      textfont: {
        color: "white",
        size: 11,
        family: "Inter, system-ui, sans-serif",
      },
    };

    const traceOngoing = {
      x: months,
      y: ongoing,
      name: "Ongoing",
      type: "bar",
      marker: {
        color: "#f59e0b",
        opacity: 0.8,
      },
      text: ongoing.map(String),
      textposition: "auto",
      textfont: {
        color: "white",
        size: 11,
        family: "Inter, system-ui, sans-serif",
      },
    };

    const traceTotal = {
      x: months,
      y: total,
      name: "Total",
      type: "scatter",
      mode: "lines+markers",
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
        shape: "spline",
      },
      yaxis: "y",
    };

    const data = [traceFinished, traceOngoing, traceTotal];

    const layout = {
      barmode: "stack",
      title: {
        text: "Monthly Records Overview",
        font: {
          family: "Inter, system-ui, sans-serif",
          size: 20,
          color: "#1f2937",
          weight: 600,
        },
        x: 0.5,
        xanchor: "center",
        pad: { t: 20, b: 20 },
      },

      xaxis: {
        title: {
          text: "Month",
          font: {
            family: "Inter, system-ui, sans-serif",
            size: 13,
            color: "#6b7280",
            weight: 500,
          },
          standoff: 20,
        },
        tickangle: -45,
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
        rangemode: "tozero",
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
        orientation: "v", // แนวตั้ง
        x: 1.02, // ขวานอกกราฟนิดหน่อย (มากกว่า 1)
        y: 0.5, // ด้านบนสุดของกราฟ
        xanchor: "left", // ให้ legend ขยายไปทางขวาจากตำแหน่ง x
        yanchor: "top", // ยึดด้านบนไว้
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
      hovermode: "x unified",
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

    const config = {
      responsive: true,
      displayModeBar: false,
      showTips: false,
    };

    Plotly.newPlot("Chart", data, layout, config);
  }, [reqRecord]);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div id="Chart" className="w-full min-h-[600px]" />
      </div>
    </div>
  );
};

export default Chart_analysis;
