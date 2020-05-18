import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input
} from "reactstrap";

const ModalExample = (props) => {
  let roomName="";
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const roomnameChangeHandler=(event)=> {
    roomName=event.target.value;
  }
  const roomnameSubmitHandler=(event)=> {
    toggle();
    props.onClickHandle(roomName);
  }
  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Create Room
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create&Select</ModalHeader>

        <ModalBody>
          <Form>
            <FormGroup>
              <Input
                type="text"
                name="roomName"
                id="roomName"
                onChange={roomnameChangeHandler}
                placeholder="room name.."
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={roomnameSubmitHandler}>
            Create
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
