import React from 'react';
import { Routes, Route} from 'react-router-dom';
import { Home } from '../Home/Home';
import { SerieDetail } from '../SerieDetail/SerieDetail';
import { Admin } from '../User/Admin/Admin';
import { Login } from '../User/Login/Login';
import { Profile } from '../User/Profile/Profile';
import { Register } from '../User/Register/Register';

export const Body = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/detail" element={<SerieDetail />}/>
            <Route path="/profile" element={<Profile />}/>
            {/* Admin secret */}
            <Route path="/admin" element={<Admin />}/>
        </Routes>
    )
};