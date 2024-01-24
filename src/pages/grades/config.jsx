import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const host = 'http://localhost:8080';

export default function GradeConfigPage({ userId = 1 }) {
  const router = useRouter();
  // const { id } = router.query;
  const [subject, setSubject] = useState([]);

  const fetchSubject = async () => {
    try {
      // Fetch all Subject
      const subjectResponse = await fetch(`${host}/subjects`);
      const subjectData = await subjectResponse.json();

      // Ensure that subjectData is an array
      if (Array.isArray(subjectData)) {
        setSubject(subjectData);
      } else {
        console.log('Array');
        setSubject([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch notifications when the component mounts and when userId changes
    fetchSubject();
  }, [userId]);

  return (
    <>
      <Head>
        <title>Grade Configuration | Grading System</title>
      </Head>

      <NavBar />
      <main className="flex">
        <SideBarMenu />
        <div className=" w-full p-4">
          <div className="min-h-[80vh] border border-gray shadow-md">
            <div className="flex items-center justify-center border border-green bg-green py-3 ">
              <h2 className="text-2xl font-bold text-white">My Subject</h2>
            </div>
            <div className="flex w-3/4 flex-col border-gray p-8">
              {/* Render class cards */}
              {subject.map((classDetails) => (
                <button
                  type="button"
                  key={classDetails.id}
                  onClick={() =>
                    router.push(
                      `/grades/subject/${classDetails.id}/?className=${classDetails.className}&id=${classDetails.id}`
                    )
                  }
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
