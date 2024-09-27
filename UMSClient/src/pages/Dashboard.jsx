import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "../components/User";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addUser, setAddUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isAddUser,setIsAddUser]=useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/admin/dashboard/");
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    console.log(addUser)
    const { name, value } = e.target;
    setErrorMessage('');

    setAddUser({
      ...addUser,
      [name]: value,
    });
  };
  const handleEdit = async (user) => {
    console.log(`Edit user with id: ${user._id}`, user);
    const result = await axios.post(
      `/api/admin/dashboard/update/${user._id}`,
      user,
      {
        "Content-Type": "application/json",
      }
    );
    console.log(result);
    setUsers(result.data);
  };

  const handleDelete = async (user) => {
    console.log(`delete user with id: ${user._id}`);

    try {
      const res = await axios.delete(`/api/admin/dashboard/delete/${user._id}`);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  const handleAddUser = async() => {
    setErrorMessage('');

   
    if (!addUser.username || !addUser.email || !addUser.password) {
        setErrorMessage('Please fill in all required fields.');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addUser.email)) {
        setErrorMessage(' "Email is invalid."');
        return;
      }

    try {
        console.log("Adding new user", addUser);
        const response = await axios.post('/api/admin/dashboard/adduser', addUser);
        
 
     setUsers([ response.data,...users]); 
        setAddUser({ username: '', email: '', password: '', profilePicture: '' });
        setIsAddUser(false);
    } catch (error) {
        console.error('Failed to add user:', error);
        setErrorMessage('Failed to add user. Please try again.'); 
       
    }

  };
const handleSearch=async()=>{
    try {
        console.log("search query",searchQuery)
        const response = await axios.get(`/api/admin/dashboard/?username=${searchQuery}`);
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
}
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center uppercase">
        User Dashboard
      </h1>
      <div className="flex justify-between">
      <div className="flex mb-4">
                <input 
                    type="text" 
                    placeholder="  name " 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
              
                    className="border border-r-slate-100  rounded w-full h-10 "
                />
                <button
          onClick={handleSearch}
          className="bg-slate-700 text-white px-4 py-2 ml-[-10px] rounded hover:opacity-85 transition duration-300 mb-4 "
        >
          search
        </button>
            </div>
        <button
          onClick={()=>setIsAddUser(!isAddUser)}
          className="bg-green-500 text-white px-4 py-2 h-10 rounded hover:bg-green-600 transition duration-300 mb-4 "
        >
          Add New User
        </button>
      </div>

      {isAddUser &&(<div className="border p-4 rounded-lg shadow-md flex items-center justify-center">
        <div className="flex flex-col items-center ">
          <div className="flex gap-2  justify-center">
            <p className="w-36">user name : </p>
            <input
              type="text"
              name="username"
              placeholder="User Name"
              value={addUser.username}
              onChange={handleChange}
              className="border p-1 rounded mb-2"
            />
          </div>
          <div className="flex gap-2  justify-center">
            <p className="w-36">email : </p>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={addUser.email}
              onChange={handleChange}
              className="border p-1 rounded mb-2"
            />
          </div>
          <div className="flex gap-2  justify-center">
            <p className="w-36">password : </p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={addUser.password}
              onChange={handleChange}
              className="border p-1 rounded mb-2"
            />
          </div>

          <button
            onClick={handleAddUser}
            className="bg-green-500 text-white px-2 py-1 rounded mr-2 mb-2"
          >
            ADD
          </button>
          <button
            onClick={() => setIsAddUser(false)}
            className="bg-gray-500 text-white px-2 py-1 rounded"
          >
            Cancel
          </button> 
           {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      </div>)}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
