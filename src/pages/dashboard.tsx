import Breadcrumb from "../components/breadcrums";
import Header from "../layouts/header";
import Sidemenu from "../layouts/sidemenu";
import SalesChart from "../components/saleschart.tsx";
import Customer from "../components/customer.tsx";
import DashboardStats from "../components/dashboardstats.tsx";
import RecentTransactions from "../components/recent.tsx";

function Dashboard() {
  return (
    <>
      <Header />
      <Sidemenu />
      <div className="main-content app-content">
        <div className="container-fluid space-y-3">
          <Breadcrumb />

          {/* Top: Dashboard Stats */}
          <DashboardStats />

          {/* Middle: Sales Chart + Quick Actions + Low Stock */}
          <div className="grid grid-cols-12 gap-4">

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
        </div>
      </div>
    </>
  );
}

export default Dashboard;
