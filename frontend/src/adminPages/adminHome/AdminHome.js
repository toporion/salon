import React, { useEffect, useState } from "react";
import AxiosSecure from "../../hook/AxiosSecure";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomeSummary = ({ user }) => {
  const axiosSecure = AxiosSecure();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === "admin") {
      const fetchSummary = async () => {
        try {
          const res = await axiosSecure.get("/income-summary");
          setSummary(res.data.data);
        } catch (error) {
          console.error("Error fetching summary:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchSummary();
    } else {
      setLoading(false);
    }
  }, [user, axiosSecure]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (user?.role !== "admin") {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">Welcome</h1>
      </div>
    );
  }

  const monthlyLabels = summary?.monthlyIncome?.map((m) => `Month ${m._id.month}`);
  const monthlyData = summary?.monthlyIncome?.map((m) => m.total);

  const yearlyLabels = summary?.yearlyIncome?.map((y) => y._id.year);
  const yearlyData = summary?.yearlyIncome?.map((y) => y.total);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Income Summary</h1>

      {/* Income Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h2 className="text-lg font-semibold">Daily Income</h2>
          <p className="text-xl font-bold">${summary?.dayIncome || 0}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h2 className="text-lg font-semibold">Monthly Income</h2>
          <p className="text-xl font-bold">
            ${summary?.monthlyIncome?.reduce((acc, curr) => acc + curr.total, 0) || 0}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h2 className="text-lg font-semibold">Yearly Income</h2>
          <p className="text-xl font-bold">
            ${summary?.yearlyIncome?.reduce((acc, curr) => acc + curr.total, 0) || 0}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Monthly Income</h2>
          <Bar
            data={{
              labels: monthlyLabels,
              datasets: [
                {
                  label: "Monthly Income",
                  data: monthlyData,
                  backgroundColor: "rgba(54, 162, 235, 0.6)",
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Yearly Income</h2>
          <Bar
            data={{
              labels: yearlyLabels,
              datasets: [
                {
                  label: "Yearly Income",
                  data: yearlyData,
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default IncomeSummary;
