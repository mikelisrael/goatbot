import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const chartOptions = {
  series: [
    {
      name: "Lorem Ipsum",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: "Dolor centri",
      data: [40, 30, 70, 98, 40, 16, 40, 20, 10],
    },
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    legend: {
      position: "bottom",
    },
    grid: {
      show: false,
    },
  },
};

const AreaPlot = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);

  return (
    <>
      <Chart
        options={
          themeReducer === "theme-mode-dark"
            ? {
                ...chartOptions.options,
                theme: { mode: "dark" },
              }
            : {
                ...chartOptions.options,
                theme: { mode: "light" },
              }
        }
        series={chartOptions.series}
        type="line"
        height="100%"
      />
    </>
  );
};

export default AreaPlot;
