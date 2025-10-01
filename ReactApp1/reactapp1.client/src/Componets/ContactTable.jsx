import {Button, Table} from 'reactstrap'

const ContactTable = ({data, showModal, deleteContact, setShowModal, setEdit}) => {

    const sendData = (contac) => {
        setEdit(contac)
        setShowModal(!showModal)  
    }
    
    
    return (
        <Table striped responsive>
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {
                (data.length < 1) ? (
                    <tr>
                        <td colSpan="4">No records</td>
                    </tr>
                ) : (
                    data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>
                                <Button color="primary" size="sm" className="me-2"
                                        onClick={() => sendData(item)}
                                > Edit </Button>
                                <Button color="danger" size="sm"
                                        onClick={() => deleteContact(item.id)}
                                >Delete</Button>
                            </td>
                        </tr>
                    ))
                )
            }
            </tbody>
        </Table>
    )
}

export default ContactTable;