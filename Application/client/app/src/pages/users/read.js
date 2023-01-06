import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button, Form, Input } from "reactstrap";
import { RiDeleteBin2Line } from 'react-icons/ri';
import { BiEdit, BiSearch } from 'react-icons/bi';

import '../styles/read.css';

export default function Users() {
    const navigate = useNavigate();
    const [usersList, setUsersList] = useState([]);

    const getUsers = () => {
        axios.get('http://localhost:3002/users')
        .then((res) => {
            setUsersList(res.data);
        });
    };
    const deleteUser = (id) => {
        .then((res) => {
            alert('Usuário removido!');
        });
    }
    const updateUser = (id) => {
    }
    const addUser = () => {
        navigate('/users/create');
    }

    return(
            <div className='read-title'>
                <h1>Usuários</h1>
                <Button color='primary' onClick={addUser}>Adicionar</Button>
            </div>
            
            <Form className="read-search">
                <Input placeholder='Pesquise aqui'></Input>
                <Button color='primary'><BiSearch /></Button>
            </Form>
            <ul className="read-list-top">
                <p>ID</p>
                <p>NICKNAME</p>
                <p>PASSWORD</p>
                <p>REALNAME</p>
            </ul>
            {usersList?.map((val, key) => {
                return (
                    <ul className="read-list" key={key}>
                        <div className='read-data'>
                            <p>{val.id}</p>
                            <p>{val.nickname}</p>
                            <p>{val.password}</p>
                            <p>{val.realname}</p>
                        </div>
                        <div className='read-buttons'>
                            <Button color="info" onClick={() => {updateUser(val.id)}}><BiEdit/></Button>
                            <Button color="danger" onClick={() => {deleteUser(val.id)}}><RiDeleteBin2Line/></Button>
                        </div>
                    </ul>
                )
            })}
        </div>
    );
};