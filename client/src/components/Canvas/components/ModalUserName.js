import React, { useRef } from 'react';
import { Button, Modal } from "react-bootstrap";
import canvasState from "../../../store-mobx/canvasState";

const ModalUserName = ({modal, setModal}) => {

  const usernameRef = useRef();

  const connectionHandler = () => {
    canvasState.setUserName(usernameRef.current.value);
    setModal(false);
  }

  return (
    <Modal show={modal} onHide={() => {}}>
      <Modal.Header>
        <Modal.Title>Введите ваше имя</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input ref={usernameRef} type={"text"}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => connectionHandler()}>
          Войти
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUserName;
