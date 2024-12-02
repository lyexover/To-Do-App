import ChartNav from "./ChartsNav"
export default function Dashboard(){
    return (
        <div className="dashboard-home-container">
            <ChartNav/>
            <div className="description">
                <div className="text">
                  <h1>Check <span>Insights !</span></h1>
                  <p>Our Insights tool provides a clear and intuitive overview of your task trends, helping you stay on top of your productivity.</p>
               </div> 
              <div className="image-container">
                 <img src="../woman-chart.avif" alt="" />
              </div>
            </div>
        </div>
    )
}