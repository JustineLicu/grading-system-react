import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const host = 'http://localhost:8080';

export default function Students() {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  const handleViewSummary = (student) => {
    router.push({
      pathname: '/generation/report',
      query: { studentId: student.id /* other parameters if needed */ },
    });
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${host}/students`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch students. Status: ${response.status}`);
        }

        const data = await response.json();

        // Fetch subject and section information for each student
        const studentsWithDetails = await Promise.all(
          data.map(async (student) => {
            const gradesResponse = await fetch(`${host}/grades?studentId=${student.id}`, {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (!gradesResponse.ok) {
              throw new Error(
                `Failed to fetch grades for student ${student.id}. Status: ${gradesResponse.status}`
              );
            }

            const gradesData = await gradesResponse.json();
            const section = gradesData[0]?.section?.name || 'N/A';
            const subject = gradesData[0]?.section?.subjectId || 'N/A';

            return {
              ...student,
              section,
              subject,
            };
          })
        );

        setStudents(studentsWithDetails);
        setFilteredStudents(studentsWithDetails);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleSearch = () => {
    const filtered = students.filter((student) => {
      return (
        student.studentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredStudents(
      filtered.filter((student) => selectedSection === '' || student.section === selectedSection)
    );
  };

  const handleSectionFilter = (section) => {
    setSelectedSection(section);
    setFilteredStudents(
      students.filter((student) => section === '' || student.section === section)
    );
  };

  return (
    <>
      {/* HEADER */}
      <Head>
        <title>Student List</title>
      </Head>

      {/* NAVIGATION BAR COMPONENT */}
      <NavBar />
      <div className="flex">
        {/* SIDE BAR COMPONENT */}
        <SideBarMenu />
        <div className="flex-grow p-5">
          <div className="content text-xl">
            <div className="">
              <h2 className="mb-4 text-2xl font-bold">Report Generation</h2>
            </div>
            <div className="account-details mt-4">
              <div id="search-sort" className="flex gap-2">
                <input
                  type="text"
                  name=""
                  className="input-field"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="button-primary" onClick={handleSearch}>
                  Search
                </button>
                <select
                  className="select-field"
                  value={selectedSection}
                  onChange={(e) => handleSectionFilter(e.target.value)}
                >
                  <option value="">All Sections</option>
                  {/* Add options for sections dynamically based on available data */}
                  {Array.from(new Set(students.map((student) => student.section)))
                    .filter((section) => section !== 'N/A')
                    .map((section) => (
                      <option key={section} value={section}>
                        {section}
                      </option>
                    ))}
                </select>
              </div>
              <div className="label mt-4 text-center">STUDENT LIST</div>
              <form className="mt-5 flex flex-col gap-5">
                <div className="table">
                  <table className="table-auto">
                    <thead>
                      <tr>
                        <th className="text-center">STUDENT #</th>
                        <th className="text-center">LAST NAME</th>
                        <th className="text-center">FIRST NAME</th>
                        <th className="text-center">MIDDLE NAME</th>
                        <th className="text-center">COURSE</th> {/* New column for course */}
                        <th className="text-center">SECTION</th>
                        <th className="text-center">SUBJECT</th>
                        <th className="text-center">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents
                        .filter((student) => student.section !== 'N/A' && student.subject !== 'N/A')
                        .map((student) => (
                          <tr key={student.id}>
                            <td className="text-center">{student.studentNumber}</td>
                            <td className="text-center">{student.lastName}</td>
                            <td className="text-center">{student.firstName}</td>
                            <td className="text-center">{student.middleName}</td>
                            <td className="text-center">{student.course}</td>{' '}
                            {/* New course column */}
                            <td className="text-center">{student.section}</td>
                            <td className="text-center">{student.subject}</td>
                            <td className="flex justify-center">
                              <button
                                id={`view-button-${student.id}`}
                                type="button"
                                className="button-secondary text-green"
                                onClick={() => handleViewSummary(student)}
                              >
                                View Summary
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
