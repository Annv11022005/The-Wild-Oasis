import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useEditCabin } from './useEditCabin';
import { useCreateCabin } from './useCreateCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editID, ...editValues } = cabinToEdit;
  const isEditsession = Boolean(editID);
  const { editCabin, isEditting } = useEditCabin();
  const { createCabin, isCreating } = useCreateCabin();
  const isWorking = isCreating || isEditting;

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditsession ? editValues : {},
  });

  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditsession)
      editCabin(
        { newCabinData: { ...data, image }, id: editID },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register('name', {
            required: 'this is field is required',
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'this is field is required',
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'this is field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'this is field is required',
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={errors?.description?.message}
      >
        <Textarea
          type='number'
          id='description'
          disabled={isWorking}
          defaultValue=''
          {...register('description', {
            required: 'this is field is required',
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo' error=''>
        <FileInput
          id='image'
          accept='image/*'
          disabled={isWorking}
          type='file'
          {...register('image', {
            required: isEditsession ? false : 'this is field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditsession ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default CreateCabinForm;
