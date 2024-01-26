import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const host = 'http://localhost:8080';

export default function GradeConfigPage() {
  const router = useRouter();
  const subjectId = router.query.subjectId;
  // const { id } = router.query;
  const [section, setSection] = useState([]);

  const fetchSection = async () => {
    try {
      const sectionResponse = await fetch(`${host}/subjects/${subjectId}/sections`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const sectionData = await sectionResponse.json();
      setSection(sectionData);
    } catch (error) {
      console.error('Error fetching current user:', error.message);
    }
  };

  useEffect(() => {
    // Fetch notifications when the component mounts and when userId changes
    fetchSection();
  }, []);

  return (
    <>
      <Head>
        <title>Sections | Grading System</title>
      </Head>

      <NavBar />
      <main className="flex">
        <SideBarMenu />
        <div className=" w-full p-4">
          <div className="relative min-h-[80vh] border border-gray shadow-md">
            <div className="flex items-center justify-center border border-green bg-green py-3 ">
              <h2 className="text-2xl font-bold text-white">My Sections</h2>
            </div>
            <div className="flex w-3/4 flex-col border-gray p-8">
              {/* Render class cards */}
              {section.map((section) => (
                <button
                  type="button"
                  key={section.id}
                  onClick={() =>
                    router.push({
                      pathname: `/reportConfig/grades`,
                      query: { sectionId: section.id, subjectId: subjectId },
                    })
                  }
                  className="mb-4 rounded-md border border-gray p-4 text-left hover:bg-yellow"
                >
                  <h2 className=" mr-1 text-2xl font-bold text-black">{section.course}</h2>
                  <p className="text-black">
                    {section.year} - {section.name}
                  </p>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => router.push(`/reportConfig/${subjectId}/sections/create`)}
              className="absolute bottom-4 right-4 rounded-full bg-yellow p-2 text-2xl font-bold text-white active:scale-95"
            >
              <Image src="/add.svg" alt="add" width={30} height={30} />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
