import styled from 'styled-components';
import Button from './Button';
import Heading from './Heading';
import PropTypes from 'prop-types';

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  // function handleConfirmClick() {}

  return (
    <StyledConfirmDelete>
      <Heading type='h3'>Xoá {resourceName}</Heading>
      <p>
        Bạn có chắc chắn muốn xoá {resourceName} này vĩnh viễn không? Hành động
        này không thể hoàn tác!
      </p>

      <div>
        <Button variation='secondary' onClick={onCloseModal}>
          Huỷ
        </Button>
        <Button variation='danger' onClick={onConfirm} disabled={disabled}>
          Xoá
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

ConfirmDelete.propTypes = {
  resourceName: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  onCloseModal: PropTypes.func.isRequired,
};

export default ConfirmDelete;
