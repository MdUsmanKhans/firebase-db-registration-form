// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, get, child, remove, update } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLIJfEHUM4Z_bDGQ5_dWA0Uj-DBOWGdEc",
  authDomain: "crud-app-cef40.firebaseapp.com",
  databaseURL: "https://crud-app-cef40-default-rtdb.firebaseio.com",
  projectId: "crud-app-cef40",
  storageBucket: "crud-app-cef40.appspot.com",
  messagingSenderId: "188392855592",
  appId: "1:188392855592:web:9d5e1a58ac2c16776e3d1d",
  measurementId: "G-B3TPCYQ22D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

const studentTableBody = document.getElementById('studentTableBody');

// Function to fetch data and populate the table
function fetchData() {
  const dbRef = ref(db);
  get(child(dbRef, "The students/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const students = snapshot.val();
        studentTableBody.innerHTML = ""; // Clear existing table data
        Object.keys(students).forEach(id => {
          const student = students[id];
          const row = document.createElement("tr");
          row.innerHTML = `
              <td class="py-3 px-4">${student.Name}</td>
            <td class="py-3 px-4">${student.email}</td>
            <td class="py-3 px-4">${student.Section}</td>
            <td class="py-3 px-4">${student.Course}</td>
            <td class="py-3 px-4">${student.Gender}</td>
            <td class="py-3 px-4">
              <button class="text-blue-600 hover:text-blue-900" onclick="editStudent('${id}', '${student.Name}', '${student.email}', '${student.Section}', '${student.Course}', '${student.Gender}')">Edit</button>
              <button class="text-red-600 hover:text-red-900" onclick="removeStudent('${id}')">Remove</button>
            </td>
          `;
          studentTableBody.appendChild(row);
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Function to remove a student
function removeStudent(id) {
  remove(ref(db, "The students/" + id))
    .then(() => {
      alert("Student removed successfully");
      fetchData(); // Refresh the data
    })
    .catch((error) => {
      console.error("Error removing student:", error);
    });
}

// Function to edit a student
function editStudent(id, name, email, section, course, gender) {
  const newName = prompt("Enter new name:", name);
  const newEmail = prompt("Enter new email:", email);
  const newSection = prompt("Enter new section:", section);
  const newCourse = prompt("Enter new course:", course);
  const newGender = prompt("Enter new gender:", gender);

  if (newName !== null && newEmail !== null && newSection !== null && newCourse !== null && newGender !== null) {
    update(ref(db, "The students/" + id), {
      Name: newName,
      email: newEmail,
      Section: newSection,
      Course: newCourse,
      Gender: newGender
    })
    .then(() => {
      alert("Student updated successfully");
      fetchData(); // Refresh the data
    })
    .catch((error) => {
      console.error("Error updating student:", error);
    });
  }
}

// Call the fetchData function when the page loads
window.onload = fetchData;

// Expose functions to global scope
window.editStudent = editStudent;
window.removeStudent = removeStudent;




