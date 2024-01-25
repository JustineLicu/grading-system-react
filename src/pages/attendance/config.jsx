import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function AttendancePage() {
  const router = useRouter();
  const { id } = router.query;

  // Fetch all classes
  const classes = [
    {
      id: '1',
      className: 'BSIT 4A',
      description: 'Description for BSIT 4A',
    },
    {
      id: '2',
      className: 'BSIT 4B',
      description: 'Description for BSIT 4B',
    },
  ];

  const classes1 = [
    {
      id: '1',
      className: 'BSIT 4A',
      description: 'Description for BSIT 4A',
    },
  ];

  // If class ID is provided, filter the class details
  const selectedClassDetails = id ? classes.find((c) => c.id === id) : null;

  return (
    <>
      <Head>
        <title>Grade Configuration | Grading System</title>
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
              <h2 className="mb-5 text-6xl font-bold text-black">ITEC 116</h2>
              <h2 className="mb-5 text-xl font-bold text-black">
                IT ELECTIVE 4 (SYSTEM INTEGRATION AND ARCHITECTURE 2)
              </h2>

              {/* Render class cards */}
              {classes.map((classDetails) => (
                <button
                  type="button"
                  key={classDetails.id}
                  onClick={() =>
                    router.push(
                      `/attendance/classes/${classDetails.id}/?className=${classDetails.className}&id=${classDetails.id}`
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
        <div className=" w-full p-9">
          <div className="relative min-h-[80vh] border border-gray shadow-md">
            <div className="flex items-center justify-center border border-green bg-green py-3 ">
              <h2 className="text-2xl font-bold text-white">Listed Subjects</h2>
            </div>

            {/* Add a label here */}
            <div className="w-1/8 flex flex-col border-gray p-8">
              <h2 className="mb-5 text-6xl font-bold text-black">DCIT 22A</h2>
              <h2 className="mb-5 text-xl font-bold text-black">COMPUTER PROGRAMMING 2</h2>

              {/* Render class cards */}
              {classes1.map((classDetails) => (
                <button
                  type="button"
                  key={classDetails.id}
                  onClick={() =>
                    router.push(
                      `/attendance/classes/${classDetails.id}/?className=${classDetails.className}&id=${classDetails.id}`
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
        <div className="w-80% p-9"></div>
      </main>
    </>
  );
}
