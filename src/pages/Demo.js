import React, { useEffect, useState } from "react";
import DemoCart from "./DemoCart";
import DemoCart1 from "./DemoCart1";

const Demo = () => {
  const Teachers = [
    {
      id: 1,
      name: "Md. Ebrahim Hossain",
      designation: "Assistant Professor",
      photoURL:
        "https://www.lus.ac.bd/wp-content/uploads/2020/01/Ebrahim-Hossain.jpg",
      courses: [
        "Computer Network",
        "Data Communication",
        "Digital Signal Processing",
        "Computer Security and Cryptography",
        "Distributed System",
        "System Analysis and Design",
        "Computer Graphics and Image processing",
        "Operating System Lab",
        "C programming Lab",
        "Computer Graphics Lab",
        "Computer Network Lab",
      ],
    },
    {
      id: 2,
      name: "Adil Ahmed Chowdhury",
      designation: "Lecturer",
      photoURL: "https://www.lus.ac.bd/wp-content/uploads/2020/07/adil-png.png",
      courses: [
        "Java Programming (Theory & Sessional)",
        "Cellular Mobile And Satellite Communication",
        "Discrete Mathematics",
        "Theory of Computation",
        "Data Communication",
        "Database Management System (Theory & Sessional)",
        "Computer Security and Cryptography",
        "Object-Oriented Programming (Theory & Sessional)",
        "Compiler Design and Construction (Theory & Sessional)",
        "Numerical Methods (Sessional)",
        "Introduction to Computing Sessional(Python)",
        "Structured Programming",
      ],
    },
    {
      id: 3,
      name: "Md. Jamaner Rahaman",
      designation: "Lecturer",
      photoURL: "https://www.lus.ac.bd/wp-content/uploads/2021/02/Capture.png",
      courses: [
        "Structured Programming (C)",
        "Object-oriented programming (Java)",
        "Introduction to Computers (Python)",
        "Artificial Intelligence",
        "Digital Signal Processing",
        "Database Management System",
        "Microprocessor, Assembly Language and Computer Interfacing",
        "Theory of Computation",
        "Engineering Drawing",
      ],
    },
  ];
  const [savedData, setSavedData] = useState([]);
  useEffect(() => {
    const savedDbData = localStorage.getItem("savedCart");
    if (savedDbData) {
      const savedData = JSON.parse(savedDbData);
      setSavedData(savedData);
    }
  }, [savedData]);
  return (
    <div className="w-[80%] mx-auto pt-10">
      {/* selected teachers */}
      {savedData.length === 0 ? (
        <h3 className="text-3xl text-center">No Teachers Selected</h3>
      ) : (
        <h3 className="text-3xl text-center">Selected teachers</h3>
      )}
      {savedData.map((teacher) => (
        <DemoCart1
          key={teacher.id}
          id={teacher.id}
          name={teacher.name}
          designation={teacher.designation}
          courses={teacher.courses}
          photoURL={teacher.photoURL}
        />
      ))}

      {/* All teachers*/}
      <h3 className="text-3xl text-center">All teachers</h3>
      {Teachers.map((teacher) => (
        <DemoCart
          key={teacher.id}
          id={teacher.id}
          name={teacher.name}
          designation={teacher.designation}
          courses={teacher.courses}
          photoURL={teacher.photoURL}
        ></DemoCart>
      ))}
    </div>
  );
};

export default Demo;
