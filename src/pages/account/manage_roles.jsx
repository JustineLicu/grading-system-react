import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
function manage_roles() {
  return (
    <>
      {/* HEADER */}
      <Head>
        <title>Manage Roles</title>
      </Head>

      {/* NAVIGATION BAR COMPONENT */}
      <NavBar />

      {/* MAIN COMPONENT */}
      <main className="flex">
        {/* SIDE BAR COMPONENT */}
        <SideBarMenu />
        <div className="container">
          <div className="content p-5 text-xl">
            Hello Admin, <span className="text-gray-500 text-xl">Juan Dela Cruz!</span>
            <div className="table-details mt-4">
              <div className="label">Managing Roles</div>
              <table class="table-auto">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Roles</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Juan Dela Cruz</td>
                    <td>Department of Computer Studies</td>
                    <td>Admin</td>
                  </tr>
                  <tr>
                    <td>Maria Delos Santos</td>
                    <td>Department of Computer Studies</td>
                    <td>Teacher</td>
                  </tr>
                  <tr>
                    <td>Maria Delos Santos</td>
                    <td>Department of Computer Studies</td>
                    <td>Teacher</td>
                  </tr>
                </tbody>
              </table>

              <div className="button mt-3 flex justify-end gap-3">
                <button className="text-md border px-3">Save</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default manage_roles;
