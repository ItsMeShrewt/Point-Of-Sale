import { useState, useEffect } from "react";
import Breadcrumb from "../components/breadcrums";
import Header from "../layouts/header";
import Sidemenu from "../layouts/sidemenu";
import SalesChart from "../components/saleschart.tsx";
import Customer from "../components/customer.tsx";
import DashboardStats from "../components/dashboardstats.tsx";
import RecentTransactions from "../components/recent.tsx";
import Loading from "../components/loading"; // Import the Loading component

function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading effect (for example, if data is being fetched)
    setTimeout(() => {
      setLoading(false); // Set loading to false after 0.75 seconds (adjust as needed)
    }, 500); // Simulate loading time (adjust as needed)
  }, []);

  return (
    <>
      <Header />
      <Sidemenu />

      <div className="main-content app-content">
        <div className="container-fluid space-y-3">
          <Breadcrumb />

          {/* Only show the loading spinner on the dashboard content */}
          <Loading loading={loading} />

          {!loading && (
            <>
              {/* Top: Dashboard Stats */}
              <DashboardStats />

              {/* Middle: Sales Chart + Quick Actions + Low Stock */}
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-6">
                  <RecentTransactions />
                </div>
                <div className="col-span-12 xl:col-span-6">
                  <SalesChart />
                </div>

                <div className="col-span-12 xl:col-span-12">
                  <Customer />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
