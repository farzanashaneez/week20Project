import React, { useEffect, useState } from 'react';

const User = ({ user, onEdit, onDelete }) => {
    const [editUser, setEditUser] = useState({});
    const [isedit, setIsedit] = useState(false); 
    const [dltCnfrm,setDltCnfrm]=useState(false);


    const handleEdit = () => {
        setIsedit(true);
        setEditUser(user); 
    };

    const handleSave = () => {
       
        onEdit(editUser);
        setIsedit(false); 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditUser({ ...editUser, [name]: value }); 
    };

    return (
        <>
       
            {isedit ? (
                 <div className="border p-4 rounded-lg shadow-md flex items-center justify-center">
                <div className='flex flex-col items-center '>
                    <img src={editUser.profilePicture} alt={`${editUser.username}'s profile`} className="w-24 h-24 rounded-full mb-2" />
                    <input 
                        type="text" 
                        name="username" 
                        value={editUser.username} 
                        onChange={handleChange} 
                        className="border p-1 rounded mb-2"
                    />
                    <input 
                        type="email" 
                        name="email" 
                        value={editUser.email} 
                        onChange={handleChange} 
                        className="border p-1 rounded mb-2"
                    />
                    <button onClick={handleSave} className="bg-green-500 text-white px-2 py-1 rounded mr-2 mb-2">Save</button>
                    <button onClick={() => setIsedit(false)} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
                </div>
                </div>
            ) : (
                <div className="border p-4 rounded-lg shadow-md flex items-center justify-between">
                    <div className='flex flex-col items-center w-[100px]'>
                        <img src={user.profilePicture} alt={`${user.username}'s profile`} className="w-24 h-24 rounded-full mb-2" />
                        <h3 className="text-lg font-semibold text-center">{user.username}</h3>
                    </div>
                    <div className='flex flex-col text-left w-80'>
                        <span className='font-bold'>Email:</span>
                        <p className="text-gray-600 text-left">{user.email}</p>
                    </div>
                    <div className="mt-2">
                        <button onClick={handleEdit} className="bg-cyan-800 text-white px-2 py-1 rounded mr-2">Edit</button>
                        <button onClick={() => setDltCnfrm(true)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                        {dltCnfrm && <div><span>delete? </span>
                    <span className='ml-3 mr-2 cursor-pointer' onClick={() => {setDltCnfrm(false);onDelete(user)}}>yes</span>
                    <span className='mr-2 cursor-pointer' onClick={()=>setDltCnfrm(false)}>No</span>
                    </div>}
                    </div>
                  
                    </div>
            )}
        
        </>
    );
};

export default User;