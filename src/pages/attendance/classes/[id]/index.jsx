// GradeConfigPage.jsx
import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
import { useRouter } from 'next/router';

const GradeConfigPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Fetch all classes
  const classes = [
    {
      id: '1',
      className: '10/11/23',
    },
    {
      id: '2',
      className: '10/12/23',
    },
    {
      id: '3',
      className: '10/13/23',
    },
  ];

  // If class ID is provided, filter the class details
  const selectedClassDetails = id ? classes.find((c) => c.id === id) : null;

  return (
    <>
      <Head>
        <title>Attendance Configuration | Attendance System</title>
      </Head>

      <NavBar />
      <main className="flex">
        <SideBarMenu />
        <div className=" w-full p-9">
          <div className="relative min-h-[80vh] border border-gray shadow-md">
            <div className="flex items-center justify-center border border-green bg-green py-3 ">
              <h2 className="text-2xl font-bold text-white">Listed Subjects</h2>
            </div>

            {/* Add a label here */}
            <div className="w-1/8 flex flex-col border-gray p-8">
              {/* Render class cards */}
              {classes.map((classDetails) => (
                <button
                  type="button"
                  key={classDetails.id}
                  onClick={() =>
                    router.push(
                      `/attendance/classes/${classDetails.id}/edit/?className=${classDetails.className}&id=${classDetails.id}`
                    )
                  }
                  className="mb-4 rounded-md border border-gray p-4 text-left hover:bg-yellow"
                >
                  <h2 className="mr-1 text-2xl font-bold text-black">{classDetails.className}</h2>
                  <p className="text-black">{classDetails.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default GradeConfigPage;
