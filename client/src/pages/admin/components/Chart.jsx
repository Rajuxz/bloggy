import React from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

// Register chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const getLast7Days = () =>
    Array.from({ length: 15 }, (_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - (6 - i))
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    })
const BarChart = () => {
    const data = {
        labels: getLast7Days(),
        datasets: [
            {
                label: "Posts",
                data: [12, 19, 3, 5, 2, 3, 6],
                backgroundColor: "rgba(75, 19, 180, 0.7)",
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Half Monthly Report" },
        },
    }

    return (
        <Bar
            data={data}
            options={options}
            height={119}
        />
    )
}

export default BarChart
