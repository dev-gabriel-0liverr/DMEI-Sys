import React from 'react';
import { Routes, Route } from 'react-router-dom';
import useAuth from '../contexts/useAuth.js';

import Login from '../pages/login/login.js';
//import Home from '../pages/home/home.js';

import Users from '../pages/users/read.js';
import CreateUser from '../pages/users/create.js';
import UpdateUser from '../pages/users/update.js';

import Entities from '../pages/entities/read.js';
import CreateEntity from '../pages/entities/create.js';
import UpdateEntity from '../pages/entities/update.js';
import Entity from '../pages/entities/entity.js';

import TesteTable from '../pages/teste-table/teste-table.js';

const Private = ({ Item }) => {
    const { signed } = useAuth();
    return signed > 0 ? <Item/> : <Login/>;
};

export default function UserRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/teste-table" element={<TesteTable/>}/>

            <Route path="/users" element={<Private Item={Users}/>}/>
            <Route path="/users/create" element={<Private Item={CreateUser}/>}/>
            <Route path="/users/:id/update" element={<Private Item={UpdateUser}/>}/>

            <Route path="/entities" element={<Private Item={Entities}/>}/>
            <Route path="/entities/create" element={<Private Item={CreateEntity}/>}/>
            <Route path="/entities/:id/update" element={<Private Item={UpdateEntity}/>}/>
            <Route path="/entities/:id" element={<Private Item={Entity}/>}/>
        </Routes>
    )
};
