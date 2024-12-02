import React from "react";
import { useLoaderData } from "react-router-dom";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer } from "recharts";
import ChartNav from "./ChartsNav";

export async function RadarLoader({ params }) {
    const userID = params.userID;
    try {
        const response = await fetch(`http://localhost:3000/api/categories/${userID}/RadarData`);
        const data = await response.json();

        if (!response.ok) {
            console.error(data.message);
        }

        return data;
    } catch (err) {
        console.error(err);
    }
}

export default function EnhancedRadarChart() {
    const data = useLoaderData();

    return (
        <div className="barchart-container mx-auto p-4 bg-white shadow-lg rounded-lg">
            <div className="barchart-header">
                <ChartNav />
                <h1>Top <span>Task Creators</span></h1>
            </div>
            
            <div style={{ width: '95%', height: '400px' }}>
    <ResponsiveContainer>
        <RadarChart className="radar" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category_name" />
            <PolarRadiusAxis />
            <Tooltip />
            <Radar dataKey="task_count" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
        </RadarChart>
    </ResponsiveContainer>
</div>

        </div>
    );
}