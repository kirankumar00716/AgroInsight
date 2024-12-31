import * as echarts from "echarts";
import { useEffect, useRef } from "react";

type CropYieldChartProps = {
  data: { crop: string; averageYield: number }[];
};

export const CropYieldChart: React.FC<CropYieldChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chart: echarts.ECharts | null = null;

    const initializeChart = () => {
      if (chartRef.current) {
        chart = echarts.init(chartRef.current, undefined, {
          renderer: "canvas",
          resizeObserver: true,
        });

        chart.setOption({
          backgroundColor: "#f4f4f4",
          xAxis: {
            type: "category",
            data: data.map((item) => item.crop),
            axisLabel: {
              rotate: 45,
              interval: 0,
              fontSize: 12,
            },
          },
          yAxis: {
            type: "value",
            name: "Average Yield (Kg/Ha)",
          },
          series: [
            {
              data: data.map((item) => item.averageYield),
              type: "bar",
              color: "#1A7FFF",
              barWidth: "50%",
            },
          ],
          tooltip: {
            trigger: "item",
            formatter: "{b}: {c} Kg/Ha",
          },
          grid: {
            top: "10%",
            right: "10%",
            bottom: "15%",
            left: "10%",
          },
        });
      }
    };

    initializeChart();

    // Resize handler for responsiveness
    const handleResize = () => {
      if (chart) {
        chart.resize();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chart) {
        chart.dispose();
      }
    };
  }, [data]);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: "400px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    />
  );
};
