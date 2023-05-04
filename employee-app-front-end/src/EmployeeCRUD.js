import axios from "axios";
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function EmployeeCRUD(){
   
    

    const [EmployeeId, setId] = useState("");
    const [FirstName, setFName] = useState("");
    const [LastName, setLName] = useState("");
    const [Email, setEmail] = useState("");
    const [Dob, setDOB] = useState("");
    const [Age, setAge] = useState("");
    const [Salary, setSalary] = useState("");
    const [DepartmentId, setDepartment] = useState("");

    const [departmentList, setdepartmentList] = useState([{'departmentId':'','departmentName':''}]);
    const [employees, setUsers] = useState([]);

    useEffect(()=>{             //Fetch all department data 
        const fetchData = async()=>{
          const response = await fetch ('https://localhost:7294/api/Departments')
          const newData = await response.json();
          setdepartmentList(newData);
        };
        fetchData();

    },[])

    useEffect(() => {
        (async () => await Load())();
    }, []);

    async function Load() {       // Function for get all the employee data to table
        const result = await axios.get("https://localhost:7294/api/Employees");    
        setUsers(result.data);
        console.log(result.data); 
    }

    const Registrationsuccess = () => toast.success("Employee Registation Success", { // Registration success toast msg
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });



  async function save(event) {   // Funtion for save new employee record
    event.preventDefault();
    try {
          if(FirstName === ""){
                  alert("Enter First Name");
                  return false;
          }else if (LastName === "") {
                  alert("Enter Last Name");
                  return false;
          }else if(Email === ""){
                  alert("Enter Email");
                  return false;
          }else if(Dob===""){
                  alert("Enter Date Of Birth");
                  return false;
          }else if(Age===""){
                  alert("Enter Age");
                  return false;
          }else if(Salary===""){
                  alert("Enter Salary Amount");
                  return false;
          }else if(DepartmentId===""){
            alert("Enter Department");
            return false;
          }
          else{
            await axios.post("https://localhost:7294/api/Employees", {
        
                  FirstName: FirstName,
                  LastName: LastName,
                  Email: Email,
                  Dob: Dob,
                  Age: Age,
                  Salary: Salary,
                  DepartmentId: DepartmentId,
    
            });
            Registrationsuccess();
            setId("");
            setFName("");
            setLName("" );
            setEmail("");
            setDOB("" );
            setAge("");
            setSalary("" );
            setDepartment("");
    
  
            Load();
       
          }
           
              
              
        } catch (err) {
              alert(err);
        }
  }
 
  function DisableRegistrationButton(){       // DisableRegistrationButton
    document.getElementById("register").disabled = true;
  }

  async function EditEmployee(employees) {    // Function for get selected employee data to the text fileds for update
      DisableRegistrationButton();
      setFName(employees.firstName);
      setLName(employees.lastName);
      setEmail(employees.email);
      setDOB(employees.dob);
      setAge(employees.age);
      setSalary(employees.salary);
      setDepartment(employees.departmentId);
  
      setId(employees.employeeId);
  }


  const Deletesuccess = () => toast.success("Record Delete Success", { // Delete success toast msg
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  async function DeleteEmployee(employee_ID) // Function for delete selected employee
  {    
      await axios.delete("https://localhost:7294/api/Employees/" + employee_ID);

        Deletesuccess();
        setId("");
        setFName("");
        setLName("");
        setEmail("");
        setDOB("");
        setAge("");
        setSalary("");
        setDepartment("");

        Load();
  }
 
  function EnableRegistrationButton(){   // Enable Registration Button
    document.getElementById("register").removeAttribute('disabled');
  }


  const Updatesuccess = () => toast.success('Record Updated Success', { // Update success toast msg
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });


  async function update(event) {      // Function for update employee data
    event.preventDefault();
    try {
                if(FirstName === ""){
                  alert("Enter First Name");
                  return false;
                }else if (LastName === "") {
                  alert("Enter Last Name");
                  return false;
                }else if(Email === ""){
                  alert("Enter Email");
                  return false;
                }else if(Dob===""){
                  alert("Enter Date Of Birth");
                  return false;
                }else if(Age===""){
                  alert("Enter Age");
                  return false;
                }else if(Salary===""){
                  alert("Enter Salary Amount");
                  return false;
                }else if(DepartmentId===""){
                   alert("Enter Department");
                  return false;
                }
          else{
              await axios.put("https://localhost:7294/api/Employees/"+ employees.find((u) => u.employeeId === EmployeeId).employeeId || EmployeeId,
              {
                  EmployeeId: EmployeeId,
                  FirstName: FirstName,
                  LastName: LastName,
                  Email: Email,
                  Dob: Dob,
                  Age: Age,
                  Salary: Salary,
                  DepartmentId: DepartmentId,
 
              }
              );
                  Updatesuccess();
                  setId("");
                  setFName("");
                  setLName("");
                  setEmail("");
                  setDOB("");
                  setAge("");
                  setSalary("");
                  setDepartment("");
                  EnableRegistrationButton();
                  Load();
          }
        } catch (err) {
                  alert(err);
        }
  }

  function clearInput() // Function for clear text fileds
  { 
        setId("");
        setFName("");
        setLName("");
        setEmail("");
        setDOB("");
        setAge("");
        setSalary("");
        setDepartment("");
        
  }



  function FindAge()   // Function for find current age
  {
        var day = document.getElementById("Date_Of_Birth").value;
        var DOB = new Date(day);
        var today = new Date();
        var Age = today.getTime()-DOB.getTime();
        Age = Math.floor(Age / (1000*60*60*24*365.25));
        document.getElementById("Age").value = Age;
  }

    // From
    return(
                    
      <div>

        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><h5>EMPLOYEE INFOMATION</h5></Navbar.Brand>
        </Container>
        </Navbar>


        <div class="container mt-4">
        <Form>          
         <ToastContainer />                         
                      <input
                        type="text"
                        class="form-control"
                        id="Employee_ID"
                        hidden
                        value={EmployeeId}
                        onChange={(event) => {
                        setId(event.target.value);}}  
                      />
                      
                      <Row className="mb-3"> 
                          <Col md>
                             <Form.Label>First Name</Form.Label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="First_Name"
                                  value={FirstName}
                                  onChange={(event) => {
                                    setFName(event.target.value);
                                    }}            
                                />
                          </Col>

                          <Col md>
                              <Form.Label>Last Name</Form.Label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="Last_Name"
                                  value={LastName}
                                  onChange={(event) => {
                                  setLName(event.target.value);
                                  }}
                              />
                          </Col>

                          <Col md>
                              <Form.Label>Email</Form.Label>
                                <input
                                  type="email"
                                  class="form-control"
                                  id="Email"
                                  value={Email}
                                  onChange={(event) => {
                                  setEmail(event.target.value);
                                  }}
                              />
                          </Col>
                        </Row> 
                        
                        <Row className="g-2">
                          <Col md>
                              <Form.Label>Date Of Birth</Form.Label>
                                <input
                                  type="text"
                                  placeholder="YYYY-DD-MM"
                                  class="form-control"
                                  id="Date_Of_Birth"
                                  value={Dob}
                                  onChange={(event) => {
                                  setDOB(event.target.value);
                                  }}
                              />
                          </Col>
         
                          <Col md>
                              <Form.Label>Age</Form.Label> 
                                <input
                                  type="text"
                                  class="form-control"
                                  id="Age"
                                  onClick={(event) =>{FindAge(event.target.value);setAge(event.target.value);}}
                                  value={Age}
                                />
                          </Col>
                        </Row>
                        &nbsp;
                        <Row className="g-2">
                          <Col md>
                              <Form.Label>Salary</Form.Label>
                                <input
                                  type="number"
                                  class="form-control"
                                  id="Salary"
                                  value={Salary}
                                  onChange={(event) => {
                                  setSalary(event.target.value);
                                  }}
                                />
                          </Col>
                          <Col md>
                              <Form.Label>Department</Form.Label>
                                <Form.Select value={DepartmentId} onChange={(event) => {
                                  setDepartment(event.target.value);
                                  }}>
                                  <option>--Select Department--</option>
                                  {departmentList.map(department=>(
                                      <option value={department.departmentId} key={department.departmentId}>
                                        {department.departmentName}</option>
                                    )) 
                                  }
                              </Form.Select>
                          </Col>
                        </Row>

          <div>
            <button class="btn btn-primary mt-4" id="register" type="submit" onClick={save}>
              Register
            </button>
            &nbsp;
            <button class="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
            &nbsp;
            <button class="btn btn-primary mt-4" onClick={clearInput}>
              Clear
            </button>
          </div>
        </Form>
      </div>
      
      &nbsp;
      &nbsp;
                                    
      <Table striped>
        <thead>
          <tr>
            <th scope="col">EMPLOYEE ID</th>
            <th scope="col">FIRST NAME</th>
            <th scope="col">LAST NAME</th>
            <th scope="col">EMAIL ADDRESS</th>
            <th scope="col">DATE OF BIRTH</th>
            <th scope="col">AGE</th>
            <th scope="col">SALARY</th>
            <th scope="col">DEPARTMENT</th>
            <th scope="col">OPTION</th>
          </tr>
        </thead>

        {employees.map(function fn(employee) {
          return (
            <tbody>
              <tr>
                <th scope="row">{employee.employeeId} </th>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.dob}</td>
                <td>{employee.age}</td>
                <td>{employee.salary}</td>
                <td>{employee.departmentId}</td>
                
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => EditEmployee(employee)}> Edit </button>
                    &nbsp;
                  
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteEmployee(employee.employeeId)}> Delete </button>
                    
                </td>
              </tr>
            </tbody>
          );
        })}

      </Table>
      </div>

    );

}

export default EmployeeCRUD;