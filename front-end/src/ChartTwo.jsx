import { useLoaderData } from "react-router-dom";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

export async function ChartTwoLoader({ params, selectedValue }) {
    const { userID, categoryID } = params;
    
    try {
        const response = await fetch(`http://localhost:3000/api/list/${userID}}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('No tasks found for this category');
            }
            throw new Error(`Failed to fetch tasks. Status: ${response.status}`);
        }
        
        const tasks = await response.json();

        const data = [
            { name: "Done", value: 0 },
            { name: "Not done", value: 0 },
            { name: "pending", value: 0 }
          ];

        const currentMonth = selectedValue;

        const monthlyTasks = tasks.filter((task) => {
            const taskDate = new Date(task.date)
            return currentMonth === taskDate.getMonth()
        })

        monthlyTasks.forEach(task => {
            if(task.status === 'Done') data[0].value += 1
            else if(task.status === 'Not Done'){
                const taskDate = new Date(task.date)
                const currentDate = new Date();
                taskDate < currentDate ? data[2].value += 1 : data[1].value +=1
                 
            }
        }
        )

        return data
    }
    catch (error) {
        console.error('Error in ChartOneLoader:', error);
        throw error;
    }
}

export default function ChartTwo(){
    const data = useLoaderData()
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div style={{ width: '100%', height: 300 }}>
      {/* Render the pie chart */}
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}