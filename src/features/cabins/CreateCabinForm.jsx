import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    mode: 'onChange', // hoặc 'onBlur'
    reValidateMode: 'onChange',
  });

  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: (newCabin) => createCabin(newCabin),
    onSuccess: () => {
      toast.success('New cabin successfully created ');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  /* const onError = (errors) => {
    console.log(errors);
  }; */

  return (
    <Form onSubmit={handleSubmit(onSubmit /*onError*/)}>
      <FormRow label={'Cabin name'} error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isCreating}
          {...register('name', {
            required: 'This feild is required',
          })}
        />
      </FormRow>

      <FormRow label={'Maximum capacity'} error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isCreating}
          {...register('maxCapacity', {
            required: 'This feild is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label={'Regular price'} error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isCreating}
          {...register('regularPrice', {
            required: 'This feild is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label={'Discount'} error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isCreating}
          defaultValue={0}
          {...register('discount', {
            required: 'This feild is required',
            validate: (value) => {
              value <= getValues().regularPrice ||
                'Discount should be less than regular price.';
            },
          })}
        />
      </FormRow>

      <FormRow
        label={'Description for website'}
        error={errors?.description?.message}
      >
        <Textarea
          type='number'
          id='description'
          disabled={isCreating}
          defaultValue=''
          {...register('description', {
            required: 'This feild is required',
          })}
        />
      </FormRow>

      <FormRow label={'Cabin photo'} error={''}>
        <FileInput id='image' accept='image/*' disabled={isCreating} />
      </FormRow>

      <FormRow>
        <Button variations='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
