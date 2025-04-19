import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../services/apiCabins';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

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
  font-family: 'Sono';
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.5rem 0.3rem;
  border: none;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-brand-600);
  color: var(--color-grey-0);

  &:hover {
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const CabinRow = ({ cabin }) => {
  const {
    id: cabinID,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success('Cabin successfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.err(err.message),
  });

  return (
    <TableRow role='row'>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up tp {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>

      <Button onClick={() => mutate(cabinID)} disabled={isDeleting}>
        Delete
      </Button>
    </TableRow>
  );
};

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    discount: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,
};

export default CabinRow;
