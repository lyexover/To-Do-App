import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import ChartNav from './ChartsNav';
import DropDown2 from './DropDown2';

export default function Piechart() {
    const [selectedValue, setSelectedValue] = useState(null);
    const [data, setData] = useState([]);
    const params = useParams();
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    useEffect(() => {
        const fetchData = async () => {
            if (selectedValue === null) return;

            try {
                const response = await fetch(
                    `http://localhost:3000/api/list/${params.userID}`
                );

                if (!response.ok) {
                    throw new Error(`Failed to fetch tasks. Status: ${response.status}`);
                }

                const tasks = await response.json();

                // Initialize data structure
                const chartData = [
                    { name: "Done", value: 0 },
                    { name: "Not done", value: 0 },
                    { name: "pending", value: 0 }
                ];

                // Filter and process tasks
                const monthlyTasks = tasks.filter((task) => {
                    const taskDate = new Date(task.date);
                    return selectedValue - 1 === taskDate.getMonth();
                });

                // Get current date without time
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);

                // Calculate values
                monthlyTasks.forEach(task => {
                    if (task.status === 'Done') {
                        chartData[0].value += 1;
                    } else if (task.status === 'Not Done') {
                        const taskDate = new Date(task.date);
                        taskDate.setHours(0, 0, 0, 0);

                        // Check if the task date is in the future by comparing full dates
                        if (taskDate < currentDate) {
                            chartData[1].value += 1;  // Not done (future task)
                        } else {
                            chartData[2].value += 1;  // Pending (past due task)
                        }
                    }
                });

                setData(chartData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedValue, params.userID]);

    return (
        <div className="barchart-container">
            <div className="barchart-header">
                <ChartNav />
                <h1><span>Productivity</span> Pulse</h1>
                <DropDown2 
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                />
            </div>
            <div style={{ width: '100%', height: 450 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie 
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius="80%"
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}