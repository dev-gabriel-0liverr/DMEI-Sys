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

export default function Machines() {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const [machinesList, setMachinesList] = useState([]);
    const [filterText, setFilterText] = useState("");


    //Getting Machines
    useEffect(() => {
        //console.log('page = ',page-1, '\nperPage = ',perPage, '\ntotalRows = ', totalRows);

        axios.get(`http://10.10.136.100:3002/machines/page=${(page-1)}/perPage=${perPage}`,)
        .then((res) => {
            setMachinesList(res.data);
        });

        axios.get('http://10.10.136.100:3002/machines/')
        .then((res) => {
            setTotalRows(res.data.length);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterText, page, perPage]);

    //Delete Machine
    const dialogDelete = (id) => {
        confirmAlert({
            title: 'Confirme a remoção',
            message: 'Você tem certeza?',
            buttons: [
                {
                label: 'Sim',
                onClick: () => {
                        deleteMachine(id);
                        setFilterText(" ");
                    }
                },
                {
                label: 'Não'
                }
            ]
        });
    };
    const deleteMachine = (id) => {
        axios.delete(`http://10.10.136.100:3002/machines/${id}/delete`)
        .then((res) => {
            setFilterText("");
            alert('Máquina removida!');
        });
    }

    //Open Machine
    const openMachine = (id) => {
        navigate(`/machines/${id}`);
    }

    //Add Machine
    const goToAdd = () => {
        navigate('/machines/create');
    }

    //Config Table and Search
    const columns = [
        {
            name: 'Num Série',
            selector: row => row.num_serial,
            width: '150px',
            center: 'yes'
        },
        {
            name: 'Tipo',
            selector: row => row.type_machine_name,
            width: '180px',
            center: 'yes'
        },
        {
            name: 'Entidade',
            selector: row => row.entities_name,
            sortable: true,
            width: '220px',
            center: 'yes'
        },
        {
            name: 'Status',
            selector: row => {return row.status === 1 ? 'Ativo' : 'Inativo'},
            center: 'yes'
        },
        {
            name: 'Open',
            selector: row => <Button
                                color="info"
                                onClick={() => openMachine(row.id)}
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
    const tableData = machinesList?.filter(
      (obj) =>
        obj.num_serial && obj.num_serial.toLowerCase().includes(filterText.toLowerCase())
    )
    .map((obj) => {
      return {
        id: obj.id,
        num_serial: obj.num_serial,
        entities_name: obj.entities_name,
        type_machine_name: obj.type_machine_name,
        status: obj.status,
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
                <h1>Máquinas</h1>
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
                paginationRowsPerPageOptions={[2,10,50,100]}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
            />
        </div>
    );
};