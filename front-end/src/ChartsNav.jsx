import { Link, useParams } from "react-router-dom"

export default function ChartNav(){
    const params = useParams()
    return (
        <div className="links">
            <Link className="dashboard-link" to={`/home/${params.userID}/barChart/chart/${params.categoryID}`}><i class="fa-solid fa-square-poll-vertical"> </i> Task Creation Timeline</Link>
            <Link className="dashboard-link" to={`/home/${params.userID}/pieChart/chart`}><i class="fa-solid fa-chart-pie"> </i> Productivity Pulse</Link>
            <Link className="dashboard-link" to={`/home/${params.userID}/radarchart`}><i class="fa-solid fa-chart-line"> </i> Top Interests</Link>
         </div>
    )
}