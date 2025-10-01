import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {useEffect, useState} from "react";


const modelContac = {
    idContac: 0,
    name: "",
    email: "",
    phone: "",
}

const ModalContac = ({showModal, setShowModal, saveContac, edit, setEdit, editContac }) => {

    const [contac, setContac] = useState(modelContac);

    const updateData = (e) => {
        setContac(
            {
                ...contac,
                [e.target.name]: e.target.value
            }
        )
    }
    
    const submitContac = () => {

        if (contac.idContac == 0) {
            saveContac(contac)
        } else {
            editContac(contac)
        }
        
        setContac(modelContac)
    }

    useEffect(()=> {
        if(edit != null){
            setContac(edit)
        } else {
            setContac(modelContac);
        }
    }, [edit])
    
    
    const closeModal = () => {
        setShowModal(!showModal);
        setEdit(null)
    }

    return (
        <Modal isOpen={showModal}>
            <ModalHeader>
                {contac.idContac == 0 ? "New Contact": "EditContact"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Name</Label>
                        <Input name="name" onChange={(e) => updateData(e)} value={contac.name}/>
                        <Label>Email</Label>
                        <Input name="email" onChange={(e) => updateData(e)} value={contac.email}/>
                        <Label>Phone</Label>
                        <Input name="phone" onChange={(e) => updateData(e)} value={contac.phone}/>
                    </FormGroup>
                </Form>
            </ModalBody>
            <Button color="primary" size="sm" onClick={submitContac}> Save</Button>
            <Button color="danger" size="sm" onClick={closeModal}> Close</Button>

            <ModalFooter>
            </ModalFooter>
        </Modal>
    )
}

export default ModalContac;