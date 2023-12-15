import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import { useRouter } from 'next/router';

export default function GradeConfigPage() {
  const router = useRouter();
  const { id } = router.query;

  // Fetch all classes
  const classes = [
    {
      id: '1',
      className: 'ITEC 116',
      description: 'IT ELECTIVE 4 - SYSTEM INTEGRATION AND ARCHITECTURE 2',
    },
    { id: '2', className: 'DCIT 22A', description: 'COMPUTER PROGRAMMING 2' },
  ];

  // If class ID is provided, filter the class details
  const selectedClassDetails = id ? classes.find((c) => c.id === id) : null;

  return (
    <>
      <NavBar />
      <main className="flex">
        <SideBarMenu />
        <div className=" w-full p-4">
          <div className="min-h-[80vh] border border-gray shadow-md">
            <div className="flex items-center justify-center border border-green bg-green py-3 ">
              <h2 className="text-2xl font-bold text-white">My Classes</h2>
            </div>
            <div className="flex w-3/4 flex-col border-gray p-8">
              {/* Render class cards */}
              {classes.map((classDetails) => (
                <button
                  type="button"
                  key={classDetails.id}
                  className="mb-4 rounded-md border border-gray p-4 text-left hover:bg-yellow"
                >
                  <h2 className=" mr-1 text-2xl font-bold text-black">{classDetails.className}</h2>
                  <p className="text-black">{classDetails.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
