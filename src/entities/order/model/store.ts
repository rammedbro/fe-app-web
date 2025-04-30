import type { LocationPoint } from '@/shared/ui/map';
import { toTypedSchema } from '@vee-validate/zod';
import { defineStore } from 'pinia';
import { useForm } from 'vee-validate';
import { AddOrderValidationSchema } from './validation';

export const useAddOrderStore = defineStore('addOrder', () => {
  const { defineField, handleSubmit, isSubmitting, errors, setErrors, resetForm } = useForm({
    validationSchema: toTypedSchema(AddOrderValidationSchema),
    initialValues: {
      payment: {
        method: 'credit-card',
      },
      confirmation: {
        newsletter: true,
        policies: true,
      },
    },
  });
  const [name] = defineField('name');
  const [phone] = defineField('phone');
  const [address] = defineField('address');
  const [city] = defineField('city');
  const [_pickupLocation] = defineField('pickup.location');
  const pickupLocation = computed({
    get: () => {
      return _pickupLocation.value?.lat && _pickupLocation.value?.lng
        ? (_pickupLocation.value as LocationPoint)
        : undefined;
    },
    set(value) {
      _pickupLocation.value = value;
    },
  });
  const [pickupDate] = defineField('pickup.date');
  const [_dropoffLocation] = defineField('dropoff.location');
  const dropoffLocation = computed({
    get: () => {
      return _dropoffLocation.value?.lat && _dropoffLocation.value?.lng
        ? (_dropoffLocation.value as LocationPoint)
        : undefined;
    },
    set(value) {
      _dropoffLocation.value = value;
    },
  });
  const [dropoffDate] = defineField('dropoff.date');
  const [paymentMethod] = defineField('payment.method');
  const [cardNumber] = defineField('payment.data.number');
  const [cardExpires] = defineField('payment.data.expires');
  const [cardCvc] = defineField('payment.data.cvc');
  const [newsletterConfirmation] = defineField('confirmation.newsletter');
  const [policiesConfirmation] = defineField('confirmation.policies');

  return {
    name,
    phone,
    address,
    city,
    pickupLocation,
    pickupDate,
    dropoffLocation,
    dropoffDate,
    paymentMethod,
    cardNumber,
    cardExpires,
    cardCvc,
    newsletterConfirmation,
    policiesConfirmation,
    defineField,
    handleSubmit,
    resetForm,
    isSubmitting,
    errors,
    setErrors,
  };
});
