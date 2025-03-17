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
  const [pickupLocation] = defineField('pickup.location');
  const [pickupDate] = defineField('pickup.date');
  const [dropoffLocation] = defineField('dropoff.location');
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
