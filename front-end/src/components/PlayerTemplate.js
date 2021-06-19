import React, { useState } from "react";
import profileImage from "../images/profile.jpg";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
function PlayerTemplate(props) {
  const [playerSelected, setPlayerSelected] = useState("");
  const [modal, setModal] = useState(false);
  const openModal = (player) => {
    setPlayerSelected(player);
    setModal(!modal);
  };
  const closeModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      {props.data === undefined ? (
        <div> There are no teams that match the search</div>
      ) : (
        <div className="players">
          {props.data.map((player) => (
            <div className="player" key={player._id}>
              <Card key={player._id} className="h-100 w-75">
                <CardBody>
                  <CardTitle tag="h1">{player.name}</CardTitle>
                  <CardSubtitle tag="h3" className="mb-2 ">
                    Position: {player.position}
                  </CardSubtitle>
                  <img alt={player._id} width="100%" src={profileImage} />
                  <CardText className="mt-2" tag="h2">
                    Club: {player.club}
                  </CardText>
                  <CardText tag="h2">Nation: {player.nation}</CardText>
                  <div className="">
                    <Button color="primary" onClick={() => openModal(player)}>
                      See Player
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}

          <Modal isOpen={modal} toggle={closeModal}>
            <ModalHeader toggle={closeModal}></ModalHeader>
            <ModalBody className="modalOption">
              <Card key={playerSelected._id} className="h-100 w-75">
                <CardBody>
                  <CardTitle tag="h1">{playerSelected.name}</CardTitle>
                  <CardSubtitle tag="h3" className="mb-2 ">
                    Position: {playerSelected.position}
                  </CardSubtitle>
                  <img alt="XD" width="100%" src={profileImage} />
                  <CardText className="mt-2" tag="h2">
                    Club: {playerSelected.club}
                  </CardText>
                  <CardText tag="h2">Nation: {playerSelected.nation}</CardText>
                </CardBody>
              </Card>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )}
    </div>
  );
}
export default PlayerTemplate;
