/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { HiPencil } from "react-icons/hi";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import Row from "../../ui/Row";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const { isCreating, createCabin } = useCreateCabin();
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }
  return (
    <>
      <Table.Row>
        {/* Cabin image */}
        <Img src={image} />

        {/* Cabin name */}
        <Cabin>{name}</Cabin>

        {/* Maximum capacity */}
        <div>Fit up to {maxCapacity}</div>

        {/* Regular price */}
        <Price>{formatCurrency(regularPrice)}</Price>

        {/* Discount (shown only if exists) */}
        {discount && <Discount>{formatCurrency(discount)}</Discount>}

        {/* Actions menu */}
        <div>
          {/* Modal component manages the popup windows */}
          <Modal>
            {/* Options menu */}
            <Menus.Menu>
              {/* Button to display the menu */}
              <Menus.Toggle id={cabinId} />

              {/* List of options in the menu */}
              <Menus.List id={cabinId}>
                {/* Duplicate cabin option */}
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Menus.Button>

                {/* Edit cabin option - opens a modal window */}
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                {/* Delete cabin option - opens a modal window */}
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              {/* Modal window for editing a cabin */}
              <Modal.Window name="edit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              {/* Modal window for confirming cabin deletion */}
              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="cabins"
                  disabled={isDeleting}
                  onConfirm={() => deleteCabin(cabinId)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>

      {/* {showForm && <CreateCabinForm cabinToEdit={cabin} />} */}
    </>
  );
}

export default CabinRow;

{
  /* <Row type="horizontal">
<Button
  size="small"
  onClick={() => handleDuplicate()}
  disabled={isCreating}
>
  <HiSquare2Stack />
</Button>

<Modal>
  <Modal.Open opens="edit">
    <Button size="small">
      <HiPencil />
    </Button>
  </Modal.Open>
  <Modal.Window name="edit">
    <CreateCabinForm cabinToEdit={cabin} />
  </Modal.Window>

  <Modal.Open opens="delete">
    <Button size="small" variation="danger">
      <HiTrash />
    </Button>
  </Modal.Open>
  <Modal.Window name="delete">
    <ConfirmDelete
      resourceName="cabins"
      disabled={isDeleting}
      onConfirm={() => deleteCabin(cabinId)}
    />
  </Modal.Window>
</Modal>
{/* <button onClick={() => setShowForm((show) => !show)}>
  <HiPencil />
</button> */
}

{
  /* <button disabled={isDeleting} onClick={() => deleteCabin(cabinId)}>
  <HiTrash />
</button> */
}
// </Row>
//  */}
