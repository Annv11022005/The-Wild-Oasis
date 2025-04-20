import styled from 'styled-components';
import { useState } from 'react';

import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import { formatCurrency } from '../../utils/helpers';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreateCabin } from './useCreateCabin';
import PropTypes from 'prop-types';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

const Button = styled.button`
  font-size: 1.6rem;
  color: var(--color-grey-0);
  padding: 0.3rem 0.4rem;
  border: none;
  background-color: var(--color-brand-600);
  border-radius: var(--border-radius-sm);

  &:hover {
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const Square = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
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
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <TableRow role='row'>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <Square>
          <Button disabled={isCreating} onClick={handleDuplicate}>
            <HiSquare2Stack />
          </Button>
          <Button onClick={() => setShowForm((show) => !show)}>
            <HiPencil />
          </Button>
          <Button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>
            <HiTrash />
          </Button>
        </Square>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxCapacity: PropTypes.number,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,
    image: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default CabinRow;
