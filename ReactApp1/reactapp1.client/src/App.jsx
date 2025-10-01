import {Button, Card, CardBody, CardHeader, Col, Container, Row} from 'reactstrap'
import ContactTable from "@/Componets/ContactTable.jsx";
import {useEffect, useState} from "react";
import ModalContac from "@/Componets/ModalContac.jsx";

const App = () => {

    const [contac, setContac] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [edit, setEdit] = useState(null)

    const showContacs = async () => {
        const response = await fetch('/api/contac/list');

        if (response.ok) {
            const data = await response.json();
            setContac(data)
        } else {
            console.log("error in list ")
        }
    }

    useEffect(() => {
        showContacs()
    }, [])

    const saveContac = async (contac) => {
        const response = await fetch("/api/contac/save", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(contac)
        })

        if (response.ok) {
            setShowModal(!showModal);
            showContacs();
        }
    }

    const editContac = async (contac) => {
        const response = await fetch('/api/contac/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(contac)
        })

        if (response.ok) {
            setShowModal(!showModal);
            showContacs();
        }
    }
    
    const deleteContac = async (id) => {
        var reponseWindow = window.confirm("Are you sure?");
        
        if (!reponseWindow) {
            return;
        }
        
        
        const response = await fetch('/api/contac/delete/' + id, {
            method : 'DELETE',
        })
        
        if(response.ok) {
            showContacs()
        }
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Contac List</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success"
                                    onClick={() => setShowModal(!showModal)}
                            >New Contact</Button>
                            <hr/>
                            <ContactTable data={contac}
                                          setEdit={setEdit}
                                          showModal={showModal}
                                          setShowModal={setShowModal}
                                          
                                          deleteContact={deleteContac}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalContac showModal={showModal}
                         setShowModal={setShowModal}
                         saveContac={saveContac}

                         edit={edit}
                         setEdit={setEdit}
                         editContac={editContac}

            />
        </Container>
    )
}

export default App;