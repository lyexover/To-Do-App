import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export async function ChartOneLoader({ params }) {
    const { userID, categoryID } = params;
    
    try {
        const response = await fetch(`http://localhost:3000/api/list/${userID}/${categoryID}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('No tasks found for this category');
            }
            throw new Error(`Failed to fetch tasks. Status: ${response.status}`);
        }
        
        const tasks = await response.json();

        const monthlyData = Array.from({ length: 12 }, (_, index) => ({
            month: index + 1,
            tasks: 0
        }));

        tasks.forEach((task) => {
            const date = new Date(task.date);
            const month = date.getMonth() + 1;
            const monthData = monthlyData.find(element => element.month === month);
            if (monthData) {
                monthData.tasks += 1;
            }
        });

       

        return monthlyData.sort((a, b) => a.month - b.month);

    } catch (error) {
        console.error('Error in ChartOneLoader:', error);
        throw error;
    }
}

function ChartOne() {
    const data = useLoaderData();
    console.log(data)
const params = useParams()
   return (
    params.categoryID !== 'undefined' ? <div style={{ width: '95%', height: '400px' }}>
  <ResponsiveContainer>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
      <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
      <YAxis type="number" domain={[0, 'dataMax']} tickLine={false} axisLine={false} fontSize={12} />
      <Tooltip
        contentStyle={{
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          padding: '10px',
          fontSize: '12px',
        }}
      />
      <Bar dataKey="tasks" fill="#DC5252" barSize={40} />
    </BarChart>
  </ResponsiveContainer>
</div>
: <h3>choose a category !</h3>
    ) ; 
}

export default ChartOne;
