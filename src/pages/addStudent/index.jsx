import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const AddStudentPage = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    studentNumber: '',
    firstName: '',
    middleName: '',
    lastName: '',
    nameSuffix: '',
    course: '',
    email: '',
    contactNumber: '',
  });

  useEffect(() => {
    // Fetch all students on component mount
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8080/students', {
        method: 'GET', // Adjust the method as needed
        headers: {
          'Content-Type': 'application/json', // Adjust headers as needed
        },
        credentials: 'include', // Include credentials in the request
      });

      const data = await response.json();

      // Check if data is not empty before updating state
      if (data) {
        setStudents(data);
      } else {
        console.error('Error fetching students: Response is empty');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleAddStudent = async () => {
    if (
      !newStudent.studentNumber ||
      !newStudent.firstName ||
      !newStudent.lastName ||
      !newStudent.course
    ) {
      alert('Please fill in required fields (Student Number, First Name, Last Name, Course)');
      return;
    }

    try {
      // Send a POST request to create a new student
      await fetch('http://localhost:8080/students', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });
      // Fetch updated list of students after adding a new one
      fetchStudents();
      alert('Student added successfully!');
      // Clear the form after successful addition
      setNewStudent({
        studentNumber: '',
        firstName: '',
        middleName: '',
        lastName: '',
        nameSuffix: '',
        course: '',
        email: '',
        contactNumber: '',
      });
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Error adding student. Please try again.');
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      // Send a DELETE request to delete an existing student
      await fetch(`http://localhost:8080/students/${studentId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      // Fetch updated list of students after deleting
      fetchStudents();
      alert('Student deleted successfully!');
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Error deleting student. Please try again.');
    }
  };

  return (
    <>
      {/* HEADER */}
      <Head>
        <title>Add Student</title>
      </Head>

      {/* NAVIGATION BAR COMPONENT */}
      <NavBar />

      {/* MAIN COMPONENT */}
      <main className="flex">
        {/* SIDE BAR COMPONENT */}
        <SideBarMenu />

        {/* Your content for the "addStudent" page goes here */}
        <div className="content">
          <div className="form-container">
            <h1>Add Student</h1>

            {/* Form to add a new student */}
            <form className="student-form">
              <label>
                Student Number
                <input
                  type="text"
                  name="studentNumber"
                  value={newStudent.studentNumber}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                First Name
                <input
                  type="text"
                  name="firstName"
                  value={newStudent.firstName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Last Name
                <input
                  type="text"
                  name="lastName"
                  value={newStudent.lastName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Course
                <input
                  type="text"
                  name="course"
                  value={newStudent.course}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email
                <input
                  type="text"
                  name="email"
                  value={newStudent.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Contact Number
                <input
                  type="text"
                  name="contactNumber"
                  value={newStudent.contactNumber}
                  onChange={handleInputChange}
                />
              </label>
              <button type="button" onClick={handleAddStudent}>
                Add Student
              </button>
            </form>
          </div>

          {/* List of existing students */}
          <div className="student-list-container">
            <h2>Student List</h2>
            <ul className="student-list">
              {students.map((student) => (
                <li key={student.id}>
                  <div className="student-info">
                    <p className="student-name">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="course">{student.course}</p>
                  </div>
                  <button className="delete-button" onClick={() => handleDeleteStudent(student.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* Styles */}
      <style jsx>{`
        .flex {
          display: flex;
        }

        .content {
          display: flex;
          justify-content: space-between;
          margin: 20px;
        }

        .form-container {
          flex: 1;
          margin-right: 20px;
        }

        .student-form {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
        }

        .student-form label {
          display: flex;
          flex-direction: column;
          font-size: 14px;
        }

        .student-form input {
          padding: 8px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
        }

        .student-list-container {
          flex: 1;
        }

        .student-list {
          list-style: none;
          padding: 0;
        }

        .student-list li {
          border: 1px solid #ccc;
          padding: 10px;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .student-info {
          flex: 1;
        }

        .student-name {
          font-size: 18px;
          font-weight: bold;
        }

        .course {
          color: #666;
        }

        .delete-button {
          background-color: #e57373;
          color: white;
          padding: 5px 10px;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .delete-button:hover {
          background-color: #ef5350;
        }
      `}</style>
    </>
  );
};

export default AddStudentPage;
