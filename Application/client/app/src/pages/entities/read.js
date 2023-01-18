import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import DataTable from 'react-data-table-component';

import { confirmAlert } from "react-confirm-alert";
import { Button, Form, Input } from "reactstrap";
import { MdClear, MdOpenInNew } from 'react-icons/md';
import { RiDeleteBin2Line } from 'react-icons/ri';

import '../styles/read.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Entities() {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const [entitiesList, setEntitiesList] = useState([]);
    const [filterText, setFilterText] = useState("");


    //Getting users
    useEffect(() => {
        console.log('page = ',page-1, '\nperPage = ',perPage, '\ntotalRows = ', totalRows);

        axios.get(`http://10.10.136.109:3002/entities/page=${(page-1)}/perPage=${perPage}`,)
        .then((res) => {
            setEntitiesList(res.data);
            console.log(res.data);
        });

        axios.get('http://10.10.136.109:3002/entities/')
        .then((res) => {
            setTotalRows(res.data.length);
            console.log(res.data);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterText, page, perPage]);

    //Delete user
    const dialogDelete = (id) => {
        confirmAlert({
            title: 'Confirme a remoção',
            message: 'Você tem certeza?',
            buttons: [
                {
                label: 'Sim',
                onClick: () => {
                        deleteEntity(id);
                        setFilterText("");
                    }
                },
                {
                label: 'Não'
                }
            ]
        });
    };
    const deleteEntity = (id) => {
        axios.delete(`http://10.10.136.109:3002/entities/${id}/delete`)
        .then((res) => {
            alert('Entidade removida!');
        });
    }

    //Open Entity
    const goToEntity = (id) => {
        navigate(`/entities/${id}`);
    }

    //Add user
    const goToAdd = () => {
        navigate('/entities/create');
    }

    //Config Table and Search
    const columns = [
        {
            name: 'Code',
            selector: row => row.code,
            width: '100px',
            center: 'yes'
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            width: '150px',
            center: 'yes'
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            center: 'yes'
        },
        {
            name: 'Name-Manager',
            selector: row => row.name_manager,
            sortable: true,
            width: '200px',
            center: 'yes'
        },
        {
            name: 'Open',
            selector: row => <Button
                                color="info"
                                onClick={() => goToEntity(row.id)}
                            >
                                <MdOpenInNew/>
                            </Button>,
            center: 'yes'
        },
        {
            name: 'Remove',
            selector: row => <Button
                                color="danger"
                                onClick={() => dialogDelete(row.id)}
                            >
                                <RiDeleteBin2Line/>
                            </Button>,
            center: 'yes'
        },
    ];
    const tableData = entitiesList?.filter(
      (entities) =>
        entities.name && entities.name.toLowerCase().includes(filterText.toLowerCase())
    )
    .map((entities) => {
      return {
        id: entities.id,
        code: entities.code,
        name: entities.name,
        phone: entities.phone,
        name_manager: entities.name_manager
      };
    });

    const handleClear = () => {
        if (filterText) {
        setFilterText("");
        }
    };

    const handlePerRowsChange = (newPerPage) => {
        setPerPage(newPerPage);
    };

    const handlePageChange = (page) => {
        setPage(page);
    };

    return(
        <div className="read">
            <div className='read-title'>
                <h1>Entities</h1>
                <Button color='primary' onClick={goToAdd}>Adicionar</Button>
            </div>

            <Form className="read-search">
                <Input
                    placeholder='Pesquise aqui'
                    type="text"
                    value={filterText}
                    onChange={(event) => {
                        setFilterText(event.target.value);
                    }}
                />
                <Button onClick={handleClear}>
                    <MdClear/>
                </Button>
            </Form>

            <hr/>
            
            <DataTable
                columns={columns}
                data={tableData}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                paginationComponentOptions={{
                    rowsPerPageText: 'Filas por página',
                    rangeSeparatorText: 'de',
                    selectAllRowsItem: true,
                    selectAllRowsItemText: 'Todos',
                }}
                paginationRowsPerPageOptions={[10,50,100]}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
            />
        </div>
    );
};