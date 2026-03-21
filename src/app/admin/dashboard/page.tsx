export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-500">Users</p>
          <h2 className="text-xl font-semibold">120</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-500">Orders</p>
          <h2 className="text-xl font-semibold">45</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-500">Revenue</p>
          <h2 className="text-xl font-semibold">$3,200</h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border p-5">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">User</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-2">John Doe</td>
              <td>Active</td>
              <td>2026-03-20</td>
            </tr>

            <tr className="border-b">
              <td className="py-2">Jane Smith</td>
              <td>Inactive</td>
              <td>2026-03-19</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
