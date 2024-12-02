import Dropdown from "./Dropdown"
import ChartOne from "./ChartOne"
import ChartNav from "./ChartsNav"
import './css/dashboard.css'


export default function BarChart(){
    return (
        <div className="barchart-container">
            <div className="barchart-header">
               <ChartNav/>
               <h1>Task Creation <span>Timeline</span></h1>
               <Dropdown/>
           </div>
           <ChartOne/>
        </div>
    )
}