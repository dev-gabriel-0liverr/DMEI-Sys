import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ListGroup,
    ListGroupItem,
    Collapse
} from 'reactstrap';
import useAuth from '../../contexts/useAuth';

import './side-menu.css';

export default function SideMenu() {
    const { signed } = useAuth();

    const [outerSched, setOuterSched] = useState(true);
    const toggleOuterSched = () => setOuterSched(!outerSched);

    const [innerAttend, setInnerAttend] = useState(true);
    const toggleInnerAttend = () => setInnerAttend(!innerAttend);

    const [inputEquip, setInputEquip] = useState(true);
    const toggleInputEquip = () => setInputEquip(!inputEquip);

    const [entities, setEntities] = useState(true);
    const toggleEntities = () => setEntities(!entities);

    const [users, setUsers] = useState(true);
    const toggleUsers = () => setUsers(!users);

    return (
        <div className='side-menu-border'>
            {signed ? (
            <div className='side-menu'>
                <ListGroup flush>
                    <ListGroupItem href="#" tag="a">
                        Dashboard
                    </ListGroupItem>
                    <ListGroupItem href="#" tag="a">
                        Histórico
                    </ListGroupItem>
                    

                    <ListGroupItem href="#" tag="a" color='secondary' onClick={toggleOuterSched}>
                        Agendamento Externo
                    </ListGroupItem>
                    <Collapse isOpen={!outerSched}>
                        <ListGroupItem href="#" tag="a">
                            Listar
                        </ListGroupItem>
                        <ListGroupItem href="#" tag="a">
                            Adicionar
                        </ListGroupItem>
                        <ListGroupItem href="#" tag="a">
                            Lixeira
                        </ListGroupItem>
                    </Collapse>


                    <ListGroupItem href="#" tag="a" color='secondary' onClick={toggleInnerAttend}>
                        Atendimento Interno
                    </ListGroupItem>
                    <Collapse isOpen={!innerAttend}>
                        <ListGroupItem href="#" tag="a">
                            Listar
                        </ListGroupItem>
                        <ListGroupItem href="#" tag="a">
                            Adicionar
                        </ListGroupItem>
                        <ListGroupItem href="#" tag="a">
                            Lixeira
                        </ListGroupItem>
                    </Collapse>


                    <ListGroupItem href="#" tag="a" color='secondary' onClick={toggleInputEquip}>
                        Entrada de Equipamentos
                    </ListGroupItem>
                    <Collapse isOpen={!inputEquip}>
                        <ListGroupItem href="#" tag="a">
                            Listar
                        </ListGroupItem>
                        <ListGroupItem href="#" tag="a">
                            Adicionar
                        </ListGroupItem>
                        <ListGroupItem href="#" tag="a">
                            Lixeira
                        </ListGroupItem>
                    </Collapse>


                    <ListGroupItem href="#" tag="a" color='secondary' onClick={toggleEntities}>
                        Entidades
                    </ListGroupItem>
                    <Collapse isOpen={!entities}>
                        <ListGroupItem tag="a">
                            <Link to='/entities'>Listar</Link>
                        </ListGroupItem>
                        <ListGroupItem tag="a">
                            <Link to='/entities/create'>Adicionar</Link>
                        </ListGroupItem>
                        <ListGroupItem tag="a">
                            Lixeira
                        </ListGroupItem>
                    </Collapse>
                    

                    <ListGroupItem href="#" tag="a" color='secondary' onClick={toggleUsers}>
                        Usuários
                    </ListGroupItem>
                    <Collapse isOpen={!users}>
                        <ListGroupItem href="/users" tag="a">
                            <Link to='/users'>Listar</Link>
                        </ListGroupItem>
                        <ListGroupItem href="/users/create" tag="a">
                            <Link to='/users/create'>Adicionar</Link>
                        </ListGroupItem>
                        <ListGroupItem href="#" tag="a">
                            Lixeira
                        </ListGroupItem>
                    </Collapse>
                    
                </ListGroup>
            </div>
            ) : ('')}
        </div>
    );
};