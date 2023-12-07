import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import { useRouter } from 'next/router';

const getAllClasses = () => {
  return [
    {
      id: '1',
      className: 'ITEC 116',
      description: 'IT ELECTIVE 4 - SYSTEM INTEGRATION AND ARCHITECTURE 2',
    },
    { id: '2', className: 'DCIT 22A', description: 'COMPUTER PROGRAMMING 2' },
  ];
};

export default function GradeConfigMyClasses() {
  const router = useRouter();
  const { id } = router.query;

  // Fetch all classes
  const allClasses = getAllClasses();

  // If class ID is provided, filter the class details
  const selectedClassDetails = id ? allClasses.find((c) => c.id === id) : null;

  return (
    <>
      <NavBar />
      <main className="flex">
        <SideBarMenu />
        <div className="max-w-container mx-auto p-4">
          <div className="border border-green">
            <div className="flex items-center justify-center border border-green bg-green">
              <h2 className="mb-4 mr-1 text-2xl font-bold text-yellow">My Classes</h2>
            </div>
            <div className="border-green p-8 shadow-md">
              {/* Render class cards */}
              {allClasses.map((classDetails) => (
                <div
                  key={classDetails.id}
                  className="mb-4 rounded-md border border-green bg-green p-4"
                >
                  <h2 className="mb-4 mr-1 text-2xl font-bold text-white">
                    {classDetails.className}
                  </h2>
                  <p className="text-white">{classDetails.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
