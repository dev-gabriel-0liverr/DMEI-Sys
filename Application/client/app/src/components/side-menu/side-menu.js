import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, SubMenu, MenuItem } from 'react-pro-sidebar';
import { AiFillLayout } from 'react-icons/ai';
import { BsCpuFill } from 'react-icons/bs';
import { GoTasklist } from 'react-icons/go';
import { VscServerEnvironment, VscServer, VscServerProcess } from 'react-icons/vsc';
import { GoDiffAdded } from 'react-icons/go';
import { MdLogout } from 'react-icons/md';
import { RiHistoryLine } from 'react-icons/ri';
import { FaUsers, FaBuilding, FaListUl, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../contexts/useAuth';

import './side-menu.css';
import { FormGroup, Input, Label } from 'reactstrap';

export default function SideMenu() {
    const { signed, signout } = useAuth();

    const navigate = useNavigate();

    const logout = () => {
        signout();
    };

    const [theme, setTheme] = useState(false);
    useEffect(() => {
        if (theme === true) {
            document.getElementById('root').className = 'light';
        } else {
            document.getElementById('root').className = 'dark';
        }
    },[theme])

    if (signed === null) {
        return ('');
    }
    else if (signed.type === 1) {
        return (
            <div className='side-menu'>
                <Sidebar className='side-bar'>
                    <Menu transitionDuration={1000}>
                        <h1 className='title'>DMEIsys</h1>
                        <hr/>
                        <FormGroup switch style={{textAlign:'left', padding:'0px 20px', alignContent:'center'}}>
                            <Input
                                style={{
                                    marginTop:'4px',
                                    marginBottom:'4px',
                                    marginLeft:'4px',
                                    marginRight:'8px'
                                }}
                                type="switch"
                                defaultChecked={false}
                                onClick={() => {
                                    setTheme(!theme);
                                }}
                            />
                            <Label>Tema de Cor</Label>
                        </FormGroup>
                        <hr/>

                        <MenuItem
                            icon={<AiFillLayout />}
                            onClick={()=>{navigate('/dashboard')}}>
                            Dashboard
                        </MenuItem>

                        <hr/>
                        <SubMenu label="Entradas" icon={<VscServer />}>
                            <MenuItem
                                icon={<FaListUl />}
                                onClick={()=>{navigate('/inputs')}}>
                                Listar
                            </MenuItem>
                            <MenuItem
                                icon={<GoDiffAdded />}
                                onClick={()=>{navigate('/inputs/create')}}>
                                Adicionar
                            </MenuItem>
                            <MenuItem
                                icon={<GoTasklist />}
                                onClick={()=>{navigate('/inputs/terminateds')}}>
                                Conclu??dos
                            </MenuItem>
                            <MenuItem
                                icon={<FaCheck />}
                                onClick={()=>{navigate('/inputs/terminate')}}>
                                Finalizar
                            </MenuItem>
                        </SubMenu>

                        <SubMenu label="Externos" icon={<VscServerEnvironment />}>
                            <MenuItem
                                icon={<FaListUl />}
                                onClick={()=>{navigate('/externals')}}>
                                Listar
                            </MenuItem>
                            <MenuItem
                                icon={<GoDiffAdded />}
                                onClick={()=>{navigate('/externals/create')}}>
                                Adicionar
                            </MenuItem>
                        </SubMenu>

                        <SubMenu label="Internos" icon={<VscServerProcess />}>
                            <MenuItem
                                icon={<FaListUl />}
                                onClick={()=>{navigate('/internals')}}>
                                Listar
                            </MenuItem>
                            <MenuItem
                                icon={<GoDiffAdded />}
                                onClick={()=>{navigate('/internals/create')}}>
                                Adicionar
                            </MenuItem>
                        </SubMenu>

                        <hr/>

                        <SubMenu label="M??quinas" icon={<BsCpuFill />}>
                            <MenuItem
                                icon={<FaListUl />}
                                onClick={()=>{navigate('/machines')}}>
                                Listar
                            </MenuItem>
                            <MenuItem
                                icon={<GoDiffAdded />}
                                onClick={()=>{navigate('/machines/create')}}>
                                Adicionar
                            </MenuItem>
                            <MenuItem
                                icon={<RiHistoryLine />}
                                onClick={()=>{navigate('/machines/records')}}>
                                Registros
                            </MenuItem>
                        </SubMenu>

                        <SubMenu label="Entidades" icon={<FaBuilding />}>
                            <MenuItem
                                icon={<FaListUl />}
                                onClick={()=>{navigate('/entities')}}>
                                Listar
                            </MenuItem>
                            <MenuItem
                                icon={<GoDiffAdded />}
                                onClick={()=>{navigate('/entities/create')}}>
                                Adicionar
                            </MenuItem>
                        </SubMenu>

                        <SubMenu label="Usu??rios" icon={<FaUsers />}>
                            <MenuItem
                                icon={<FaListUl />}
                                onClick={()=>{navigate('/users')}}>
                                Listar
                            </MenuItem>
                            <MenuItem
                                icon={<GoDiffAdded />}
                                onClick={()=>{navigate('/users/create')}}>
                                Adicionar
                            </MenuItem>
                        </SubMenu>

                        <hr/>
                        
                        <MenuItem
                            icon={<MdLogout />}
                            onClick={logout}>
                            Sair
                        </MenuItem>
                    </Menu>
                </Sidebar>
            </div>
        )
    }
    else if (signed.type === 2) {
        return (
            <div className='side-menu'>
                <Sidebar className='side-bar'>
                    <Menu transitionDuration={1000}>
                        <h1 className='title'>DMEIsys</h1>
                        
                        <hr/>
                        <FormGroup switch style={{textAlign:'left', padding:'0px 20px'}}>
                            <Input
                                style={{
                                    marginTop:'4px',
                                    marginBottom:'4px',
                                    marginLeft:'4px',
                                    marginRight:'8px'
                                }}
                                type="switch"
                                defaultChecked={false}
                                onClick={() => {
                                    setTheme(!theme);
                                }}
                            />
                            <Label>Tema de Cor</Label>
                        </FormGroup>
                        <hr/>

                        <MenuItem
                            icon={<AiFillLayout />}
                            onClick={()=>{navigate('/anon/dashboard')}}>
                            Dashboard
                        </MenuItem>

                        <hr/>

                        <SubMenu label="Externos" icon={<VscServerEnvironment />}>
                            <MenuItem
                                icon={<FaListUl />}
                                onClick={()=>{navigate('/anon/externals')}}>
                                Listar
                            </MenuItem>
                        </SubMenu>

                        <hr/>
                        
                        <MenuItem
                            icon={<MdLogout />}
                            onClick={logout}>
                            Sair
                        </MenuItem>
                    </Menu>
                </Sidebar>
            </div>
        )
    }
};