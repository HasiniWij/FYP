import React from "react";
import renderer from "react-test-renderer";
import axios from 'axios';
import AdminDashboard from '../components/AdminDashboard';
import StudentDashboard from "../components/StudentDashboard";
import SupervisorDashboard from "../components/SupervisorDashboard";
import SignUp from "../components/SignUp";
import AdminStudentList from "../components/AdminStudentList";
import StudentsList from "../components/StudentsList";
import SupervisorsList from "../components/SupervisorsList";
import AdminSupervisorList from "../components/AdminSupervisorList";

const students = [
  {
   'universityId':'w245678',
   'name':'Jon Doe'
  },
  {
    'universityId':'w24d678',
    'name':'Tecla jof'
   },
]
const supervisors =[
  // {
  //   'interests':'web development',
  //   'name':'Jon Doe'
  //  },
   {
     'interests':'w24d678',
     'name':'mobile development, data science',
     "email":'sss',
     "capacity":3,
     "id":'22',
    }
]
jest.mock("axios")
describe("Jest Snapshot testing suite", () => {
  it("Snapshot testing AdminDashboard", () => {
    const domTree = renderer.create(<AdminDashboard />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
  it("Snapshot testing StudentDashboard", () => {
    const domTree = renderer.create(<StudentDashboard />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
  it("Snapshot testing SupervisorDashboard", () => {
    const domTree = renderer.create(<SupervisorDashboard />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
  it("Snapshot testing AdminStudentList", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: students }))
    const tree = renderer.create(<AdminStudentList />);
    await Promise.resolve();
    expect(tree.toJSON()).toMatchSnapshot()
  })
  // it("Snapshot testing StudentsList", async () => {
  //   axios.get.mockImplementationOnce(() => Promise.resolve({ 'data': {'supervisors':supervisors}}))
  //   const tree = renderer.create(<AdminSupervisorList />);
  //   await Promise.resolve();
  //   expect(tree.toJSON()).toMatchSnapshot()
  // })
  // it("Matches DOM Snapshot", () => {
  //   const domTree = renderer.create(<SignUp />).toJSON();
  //   expect(domTree).toMatchSnapshot();
  // });
});
