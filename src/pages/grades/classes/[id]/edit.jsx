import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function EditGradePage() {
  // Fetch all classes
  const scores = [
    { type: 'Quiz 1', items: 10, percentage: '20%' },
    { type: 'Assignment 1', items: 10, percentage: '10%' },
    { type: 'Midterm', items: 100, percentage: '30%' },
    { type: 'Final', items: 100, percentage: '40%' },
  ];
  const router = useRouter();
  const { className, id } = router.query;
  return (
    <>
      <Head>
        <title>Grade Configuration | Grading System</title>
      </Head>

      <NavBar />
      <main className="flex">
        <SideBarMenu />
        <div className=" w-full p-4">
          <div className="relative min-h-[80vh] border border-gray shadow-md">
            <div className="flex items-center justify-center border border-green bg-green py-3 ">
              <h2 className="text-2xl font-bold text-white">Subject - {className}</h2>
            </div>
            <div className="p-8">
              <div className="mb-2 text-2xl font-bold">LECTURE</div>
              <table className="w-2/4 border">
                <thead>
                  <tr>
                    <th className="border px-4 py-1 text-lg">Type</th>
                    <th className="border px-4 py-1 text-lg">Items</th>
                    <th className="border px-4 py-1 text-lg">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((score, index) => (
                    <tr key={index}>
                      <td contentEditable={true} className="border  bg-gray text-center">
                        {score.type}
                      </td>
                      <td contentEditable={true} className="border bg-gray text-center">
                        {score.items}
                      </td>
                      <td contentEditable={true} className="border bg-gray text-center">
                        {score.percentage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                className="my-3 border border-gray px-6 py-2 text-lg font-semibold hover:bg-yellow"
              >
                + Add
              </button>
            </div>
            <div className="absolute bottom-6 right-4 flex gap-2">
              <button
                type="button"
                onClick={() => router.push(`/grades/classes/${id}?className=${className}&id=${id}`)}
                className="border border-gray px-6 py-2 text-lg font-semibold hover:bg-yellow"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
