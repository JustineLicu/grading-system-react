import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const host = 'http://localhost:8080';

export default function GradeConfigPage() {
  const router = useRouter();
  // const { id } = router.query;
  const [subject, setSubject] = useState([]);

  const fetchSubject = async () => {
    try {
      const subjectResponse = await fetch(`${host}/subjects`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const subjectData = await subjectResponse.json();
      setSubject(subjectData);
    } catch (error) {
      console.error('Error fetching current user:', error.message);
    }
  };

  useEffect(() => {
    // Fetch notifications when the component mounts and when userId changes
    fetchSubject();
  }, []);
  console.log(subject);

  return (
    <>
      <Head>
        <title>Subjects | Grading System</title>
      </Head>

      <NavBar />
      <main className="flex">
        <SideBarMenu />
        <div className=" w-full p-4">
          <div className="relative min-h-[80vh] border border-gray shadow-md">
            <div className="flex items-center justify-center border border-green bg-green py-3 ">
              <h2 className="text-2xl font-bold text-white">My Subjects</h2>
            </div>
            <div className="flex w-3/4 flex-col border-gray p-8">
              {/* Render class cards */}
              {subject.map((subj) => (
                <button
                  type="button"
                  key={subj.id}
                  onClick={() => router.push(`configuration/${subj.id}/sections`)}
                  className="mb-4 rounded-md border border-gray p-4 text-left hover:bg-yellow"
                >
                  <h2 className=" mr-1 text-2xl font-bold text-black">{subj.code}</h2>
                  <p className="text-black">{subj.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
