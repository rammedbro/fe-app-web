<template>
  <div class="container mx-auto flex flex-col-reverse gap-4 py-8 lg:flex-row lg:items-start">
    <form class="lg:w-2/3" @submit="submit">
      <section class="p-card mb-6 p-6">
        <div class="relative mb-6">
          <div class="mb-1 text-xl font-bold">Billing Info</div>
          <div class="text-sm text-surface-400">Please enter your billing info</div>

          <div class="absolute top-0 right-0 text-sm text-surface-400">Step 1 of 4</div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2">
          <div class="grid auto-rows-min gap-2">
            <div class="font-semibold">Name</div>
            <InputText
              v-model="order.name.value"
              name="name"
              variant="filled"
              placeholder="John Smith"
              class="w-full"
            />
            <div v-if="order.errors.value.name" class="text-sm text-error">{{ order.errors.value.name }}</div>
          </div>

          <div class="grid auto-rows-min gap-2">
            <div class="font-semibold">Phone</div>
            <InputMask
              v-model="order.phone.value"
              name="phone"
              variant="filled"
              mask="(999) 999-9999"
              placeholder="(999) 999-9999"
              class="w-full"
            />
            <div v-if="order.errors.value.phone" class="text-sm text-error">{{ order.errors.value.phone }}</div>
          </div>

          <div class="grid auto-rows-min gap-2">
            <div class="font-semibold">Address</div>
            <InputText
              v-model="order.address.value"
              name="address"
              variant="filled"
              placeholder="2050 Reedy Creek Place"
              class="w-full"
            />
            <div v-if="order.errors.value.address" class="text-sm text-error">{{ order.errors.value.address }}</div>
          </div>

          <div class="grid auto-rows-min gap-2">
            <div class="font-semibold">City</div>
            <InputText
              v-model="order.city.value"
              name="city"
              variant="filled"
              placeholder="Santa Barbara"
              class="w-full"
            />
            <div v-if="order.errors.value.city" class="text-sm text-error">{{ order.errors.value.city }}</div>
          </div>
        </div>
      </section>

      <section class="p-card mb-6 p-6">
        <div class="relative mb-6">
          <div class="mb-1 text-xl font-bold">Rental Info</div>
          <div class="text-sm text-surface-400">Please select your rental date</div>

          <div class="absolute top-0 right-0 text-sm text-surface-400">Step 2 of 4</div>
        </div>

        <Stepper value="1">
          <StepList>
            <Step value="1">Pick Up</Step>
            <Step value="2">Drop Off</Step>
          </StepList>
          <StepPanels>
            <StepPanel value="1" class="p-4">
              <div class="mb-4 grid gap-2">
                <div class="font-semibold">Location</div>
                <Map v-model="order.pickupLocation.value" search class="h-60 lg:h-80" />
                <div v-if="order.errors.value['pickup.location']" class="text-sm text-error">
                  {{ order.errors.value['pickup.location'] }}
                </div>
              </div>

              <div class="grid gap-6 sm:grid-cols-2">
                <div class="grid gap-2">
                  <div class="font-semibold">Date</div>
                  <DatePicker
                    v-model="order.pickupDate.value"
                    name="pickup.date"
                    variant="filled"
                    placeholder="01/02/25"
                    date-format="dd/mm/y"
                    class="w-full"
                  />
                  <div v-if="order.errors.value['pickup.date']" class="text-sm text-error">
                    {{ order.errors.value['pickup.date'] }}
                  </div>
                </div>

                <div class="grid gap-2">
                  <div class="font-semibold">Time</div>
                  <DatePicker
                    v-model="order.pickupDate.value"
                    variant="filled"
                    placeholder="12:40"
                    hour-format="24"
                    time-only
                    class="w-full"
                  />
                  <div v-if="order.errors.value['pickup.date']" class="text-sm text-error">
                    {{ order.errors.value['pickup.date'] }}
                  </div>
                </div>
              </div>
            </StepPanel>
            <StepPanel value="2" class="p-4">
              <div class="mb-4 grid gap-2">
                <div class="font-semibold">Location</div>
                <Map v-model="order.dropoffLocation.value" search class="h-60 lg:h-80" />
                <div v-if="order.errors.value['dropoff.location']" class="text-sm text-error">
                  {{ order.errors.value['dropoff.location'] }}
                </div>
              </div>

              <div class="grid gap-6 sm:grid-cols-2">
                <div class="grid gap-2">
                  <div class="font-semibold">Date</div>
                  <DatePicker
                    v-model="order.dropoffDate.value"
                    name="dropoff.date"
                    variant="filled"
                    placeholder="01/02/25"
                    date-format="dd/mm/y"
                    class="w-full"
                  />
                  <div v-if="order.errors.value['dropoff.date']" class="text-sm text-error">
                    {{ order.errors.value['dropoff.date'] }}
                  </div>
                </div>

                <div class="grid gap-2">
                  <div class="font-semibold">Time</div>
                  <DatePicker
                    v-model="order.dropoffDate.value"
                    variant="filled"
                    placeholder="12:40"
                    hour-format="24"
                    time-only
                    class="w-full"
                  />
                  <div v-if="order.errors.value['dropoff.date']" class="text-sm text-error">
                    {{ order.errors.value['dropoff.date'] }}
                  </div>
                </div>
              </div>
            </StepPanel>
          </StepPanels>
        </Stepper>
      </section>

      <section class="p-card mb-6 p-6">
        <div class="relative mb-6">
          <div class="mb-1 text-xl font-bold">Payment Method</div>
          <div class="text-sm text-surface-400">Please enter your payment method</div>

          <div class="absolute top-0 right-0 text-sm text-surface-400">Step 3 of 4</div>
        </div>

        <label
          class="mb-4 flex cursor-pointer items-center gap-4 rounded-lg bg-surface-200 px-6 py-4 dark:bg-surface-700"
        >
          <RadioButton v-model="order.paymentMethod.value" name="payment.method" value="credit-card" />
          <span>Credit Card</span>
          <img :src="visaImgUrl" alt="visa" class="ml-auto h-4" />
          <img :src="mastercardImgUrl" alt="mastercard" class="h-4" />
        </label>

        <div v-if="order.paymentMethod.value === 'credit-card'" class="p-panel mb-4 grid gap-6 p-4 sm:grid-cols-2">
          <div class="grid auto-rows-min gap-2">
            <div class="font-semibold">Card Number</div>
            <InputMask
              v-model="order.cardNumber.value"
              name="payment.number"
              variant="filled"
              mask="9999 9999 9999 9999"
              unmask
              placeholder="0000 0000 0000 0000"
              class="w-full"
            />
            <div v-if="order.errors.value['payment.data.number']" class="text-sm text-error">
              {{ order.errors.value['payment.data.number'] }}
            </div>
          </div>

          <div class="grid auto-rows-min gap-2">
            <div class="font-semibold">Card Expires</div>
            <InputMask
              v-model="order.cardExpires.value"
              name="payment.date"
              variant="filled"
              mask="99/99"
              placeholder="01/25"
              class="w-full"
            />
            <div v-if="order.errors.value['payment.data.expires']" class="text-sm text-error">
              {{ order.errors.value['payment.data.expires'] }}
            </div>
          </div>

          <div class="grid auto-rows-min gap-2">
            <div class="font-semibold">CVC</div>
            <InputMask
              v-model="order.cardCvc.value"
              name="payment.cvc"
              variant="filled"
              mask="999"
              placeholder="555"
              class="w-full"
            />
            <div v-if="order.errors.value['payment.data.cvc']" class="text-sm text-error">
              {{ order.errors.value['payment.data.cvc'] }}
            </div>
          </div>
        </div>

        <label
          class="mb-4 flex cursor-pointer items-center gap-4 rounded-lg bg-surface-200 px-6 py-4 dark:bg-surface-700"
        >
          <RadioButton v-model="order.paymentMethod.value" name="payment.method" value="paypal" />
          <span>PayPal</span>
          <img :src="paypalImgUrl" alt="paypal" class="ml-auto h-4" />
        </label>

        <label
          class="mb-4 flex cursor-pointer items-center gap-4 rounded-lg bg-surface-200 px-6 py-4 dark:bg-surface-700"
        >
          <RadioButton v-model="order.paymentMethod.value" name="payment.method" value="bitcoin" />
          <span>Bitcoin</span>
          <img :src="bitcoinImgUrl" alt="bitcoin" class="ml-auto h-4" />
        </label>
      </section>

      <section class="p-card p-6">
        <div class="relative mb-6">
          <div class="mb-1 text-xl font-bold">Confirmation</div>
          <div class="text-sm text-surface-400">
            We are getting to the end. Just few clicks and your rental is ready!
          </div>

          <div class="absolute top-0 right-0 text-sm text-surface-400">Step 4 of 4</div>
        </div>

        <div class="mb-4">
          <div class="flex items-center rounded-lg bg-surface-200 px-6 py-4 dark:bg-surface-700">
            <Checkbox v-model="order.newsletterConfirmation.value" name="confirmation.newsletter" binary class="mr-4" />
            <div>I agree with sending marketing and newsletter emails</div>
          </div>
        </div>

        <div class="mb-8 grid gap-2">
          <div class="flex items-center rounded-lg bg-surface-200 px-6 py-4 dark:bg-surface-700">
            <Checkbox v-model="order.policiesConfirmation.value" name="confirmation.policies" binary class="mr-4" />
            <div>
              I agree with our
              <RouterLink :to="{ name: TermsOfServiceRouteName }" class="underline">Terms and Conditions</RouterLink>
              and
              <RouterLink :to="{ name: PrivacyPolicyRouteName }" class="underline">Privacy Policy</RouterLink>
            </div>
          </div>
          <div v-if="order.errors.value['confirmation.policies']" class="text-sm text-error">
            {{ order.errors.value['confirmation.policies'] }}
          </div>
        </div>

        <Button type="submit" label="Rent Now" :loading="order.isSubmitting.value" size="large" class="mb-8 w-full" />

        <div class="mb-2 flex items-center gap-4">
          <img :src="securitySafetyImgUrl" alt="security-safety" class="w-10" />
          <div>
            <div class="font-semibold">All your data are safe</div>
            <div class="text-sm text-surface-400">
              We are using the most advanced security to provide you the best experience ever.
            </div>
          </div>
        </div>
      </section>
    </form>

    <aside class="p-card p-6 lg:w-1/3">
      <template v-if="car">
        <div class="mb-8">
          <div class="mb-1 text-xl font-bold">Rental Summary</div>
          <div class="text-sm text-surface-400">
            Prices may change depending on the length of the rental and the price of your rental car.
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <img :src="car.images[0]" alt="Placeholder image" class="rounded-lg md:max-w-72" />
          <div>
            <div class="mb-2 text-4xl font-bold">{{ car.brand }} {{ car.model }}</div>
            <div class="flex items-center gap-2">
              <Rating :model-value="Number(car.rating)" readonly />
              <div class="text-sm text-surface-500">{{ car.views }} Reviews</div>
            </div>
          </div>
        </div>

        <div class="p-divider-horizontal" />

        <div class="mb-2 flex justify-between">
          <div class="text-surface-400">Subtotal</div>
          <div class="font-semibold">${{ car.price }}</div>
        </div>

        <div class="mb-8 flex justify-between">
          <div class="text-surface-400">Discount</div>
          <div class="font-semibold">{{ car.discount }}%</div>
        </div>

        <div class="flex items-center justify-between gap-4">
          <div>
            <div class="text-xl font-bold">Total Price</div>
            <div class="text-sm text-surface-400">Overall price including discount</div>
          </div>

          <div class="text-4xl font-bold">${{ carStore.calcTotalPrice(car.price, car.discount) }}</div>
        </div>
      </template>
      <Spinner v-else class="mx-auto block" />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { useCarStore } from '@/entities/car';
import { useAddOrderStore } from '@/entities/order';
import { addOrder } from '@/shared/api';
import {
  bitcoinImgUrl,
  mastercardImgUrl,
  paypalImgUrl,
  securitySafetyImgUrl,
  visaImgUrl,
} from '@/shared/assets/images';
import {
  PrivacyPolicyRouteName,
  ProfileOrderDetailsRouteName,
  TermsOfServiceRouteName,
} from '@/shared/router/routes.ts';
import { Map } from '@/shared/ui/map';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import DatePicker from 'primevue/datepicker';
import InputMask from 'primevue/inputmask';
import InputText from 'primevue/inputtext';
import Spinner from 'primevue/progressspinner';
import RadioButton from 'primevue/radiobutton';
import Rating from 'primevue/rating';
import Step from 'primevue/step';
import StepList from 'primevue/steplist';
import StepPanel from 'primevue/steppanel';
import StepPanels from 'primevue/steppanels';
import Stepper from 'primevue/stepper';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const carStore = useCarStore();
const orderStore = useAddOrderStore();
const order = storeToRefs(orderStore);
const { car } = storeToRefs(carStore);

const submit = orderStore.handleSubmit(async (values) => {
  if (!car.value) {
    toast.add({
      severity: 'error',
      summary: 'Something went wrong',
    });
    return;
  }

  const { data, status, error } = await addOrder<false>({
    body: {
      name: values.name,
      phone: values.phone,
      address: values.address,
      city: values.city,
      pickup: {
        location: {
          latitude: values.pickup.location.lat,
          longitude: values.pickup.location.lng,
        },
        date: values.pickup.date.toISOString(),
      },
      dropoff: {
        location: {
          latitude: values.dropoff.location.lat,
          longitude: values.dropoff.location.lng,
        },
        date: values.dropoff.date.toISOString(),
      },
      payment: values.payment,
      carId: car.value.id,
      price: carStore.calcTotalPrice(car.value.price, car.value.discount),
    },
    throwOnError: false,
  });

  if (status === 201) {
    toast.add({
      severity: 'success',
      summary: 'Order creation succeeded',
      detail: 'Lets go see details',
      life: 5000,
    });
    await router.push({ name: ProfileOrderDetailsRouteName, params: { id: data } });
    orderStore.resetForm();
    return;
  }

  if (typeof error === 'object') {
    if (error.code === 'SCHEMA_VALIDATION_ERROR') {
      orderStore.setErrors(error.details);
      return;
    }
  }

  console.error(error);
  toast.add({
    severity: 'error',
    summary: 'Order creation failed',
    detail: 'Something went wrong while booking you a car',
    life: 5000,
  });
});
</script>
