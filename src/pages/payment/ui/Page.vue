<template>
  <div class="container mx-auto flex flex-col-reverse gap-4 py-8 lg:flex-row lg:items-start">
    <div class="lg:w-2/3">
      <section class="mb-6 rounded-lg bg-white p-6 drop-shadow-md">
        <div class="relative mb-6">
          <div class="mb-1 text-xl font-bold">Billing Info</div>
          <div class="text-sm text-surface-400">Please enter your billing info</div>

          <div class="absolute top-0 right-0 text-sm text-surface-400">Step 1 of 4</div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2">
          <div>
            <div class="mb-2 font-semibold">Name</div>
            <InputText id="name" variant="filled" placeholder="Your name" class="w-full" />
          </div>

          <div>
            <div class="mb-2 font-semibold">Phone Number</div>
            <InputText id="phone" variant="filled" placeholder="Phone number" class="w-full" />
          </div>

          <div>
            <div class="mb-2 font-semibold">Address</div>
            <InputText id="address" variant="filled" placeholder="Address" class="w-full" />
          </div>

          <div>
            <div class="mb-2 font-semibold">Town/City</div>
            <InputText id="city" variant="filled" placeholder="Town or city" class="w-full" />
          </div>
        </div>
      </section>

      <section class="mb-6 rounded-lg bg-white p-6 drop-shadow-md">
        <div class="relative mb-6">
          <div class="mb-1 text-xl font-bold">Rental Info</div>
          <div class="text-sm text-surface-400">Please select your rental date</div>

          <div class="absolute top-0 right-0 text-sm text-surface-400">Step 2 of 4</div>
        </div>

        <section class="mb-4">
          <div class="mb-4 font-bold">Pick-Up</div>
          <div class="grid gap-6 sm:grid-cols-2">
            <div>
              <div class="mb-2 font-semibold">Locations</div>
              <Select variant="filled" placeholder="Select your city" class="w-full" />
            </div>

            <div>
              <div class="mb-2 font-semibold">Date</div>
              <DatePicker variant="filled" placeholder="Select your date" class="w-full" />
            </div>

            <div>
              <div class="mb-2 font-semibold">Time</div>
              <DatePicker variant="filled" placeholder="Select your time" time-only class="w-full" />
            </div>
          </div>
        </section>

        <section>
          <div class="mb-4 font-bold">Drop-Off</div>
          <div class="grid gap-6 sm:grid-cols-2">
            <div>
              <div class="mb-2 font-semibold">Locations</div>
              <Select variant="filled" placeholder="Select your city" class="w-full" />
            </div>

            <div>
              <div class="mb-2 font-semibold">Date</div>
              <DatePicker variant="filled" placeholder="Select your date" class="w-full" />
            </div>

            <div>
              <div class="mb-2 font-semibold">Time</div>
              <DatePicker variant="filled" placeholder="Select your time" time-only class="w-full" />
            </div>
          </div>
        </section>
      </section>

      <section class="mb-6 rounded-lg bg-white p-6 drop-shadow-md">
        <div class="relative mb-6">
          <div class="mb-1 text-xl font-bold">Payment Method</div>
          <div class="text-sm text-surface-400">Please enter your payment method</div>

          <div class="absolute top-0 right-0 text-sm text-surface-400">Step 3 of 4</div>
        </div>

        <label class="mb-4 flex cursor-pointer items-center gap-4 rounded-lg bg-gray px-6 py-4">
          <RadioButton />
          <span>Credit Card</span>
          <img :src="visaImgUrl" alt="visa" class="ml-auto h-4" />
          <img :src="mastercardImgUrl" alt="mastercard" class="h-4" />
        </label>

        <label class="mb-4 flex cursor-pointer items-center gap-4 rounded-lg bg-gray px-6 py-4">
          <RadioButton />
          <span>PayPal</span>
          <img :src="paypalImgUrl" alt="paypal" class="ml-auto h-4" />
        </label>

        <label class="mb-4 flex cursor-pointer items-center gap-4 rounded-lg bg-gray px-6 py-4">
          <RadioButton />
          <span>Bitcoin</span>
          <img :src="bitcoinImgUrl" alt="bitcoin" class="ml-auto h-4" />
        </label>
      </section>

      <section class="rounded-lg bg-white p-6 drop-shadow-md">
        <div class="relative mb-6">
          <div class="mb-1 text-xl font-bold">Confirmation</div>
          <div class="text-sm text-surface-400">
            We are getting to the end. Just few clicks and your rental is ready!
          </div>

          <div class="absolute top-0 right-0 text-sm text-surface-400">Step 4 of 4</div>
        </div>

        <div class="mb-4 flex items-center rounded-lg bg-gray px-6 py-4">
          <Checkbox class="mr-4" />
          <div>I agree with sending marketing and newsletter emails</div>
        </div>

        <div class="mb-8 flex items-center rounded-lg bg-gray px-6 py-4">
          <Checkbox class="mr-4" />
          <div>I agree with our terms and conditions and privacy policy</div>
        </div>

        <Button type="submit" label="Rent Now" class="mb-8" />

        <img :src="securitySafetyImgUrl" alt="security-safety" class="mb-2 w-8" />
        <div class="mb-2 font-semibold">All your data are safe</div>
        <div class="text-sm text-surface-400">
          We are using the most advanced security to provide you the best experience ever.
        </div>
      </section>
    </div>

    <aside class="rounded-lg bg-white p-6 drop-shadow-md lg:w-1/3">
      <template v-if="carAsync.isReady.value && car">
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

        <Divider />

        <div class="mb-2 flex justify-between">
          <div class="text-surface-400">Subtotal</div>
          <div class="font-semibold">${{ car.price }}</div>
        </div>

        <div class="mb-8 flex justify-between">
          <div class="text-surface-400">Discount</div>
          <div class="font-semibold">${{ car.discount }}</div>
        </div>

        <InputText id="promo-code" variant="filled" placeholder="Apply promo code" class="mb-8 w-full" />

        <div class="flex items-center justify-between gap-4">
          <div>
            <div class="text-xl font-bold">Total Rental Price</div>
            <div class="text-sm text-surface-400">Overall price and includes rental discount</div>
          </div>

          <div class="text-4xl font-bold">${{ ((Number(car.price) * (100 - car.discount)) / 100).toFixed(2) }}</div>
        </div>
      </template>
      <Spinner v-else class="mx-auto block" />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { getCar } from '@/shared/api';
import {
  bitcoinImgUrl,
  mastercardImgUrl,
  paypalImgUrl,
  securitySafetyImgUrl,
  visaImgUrl,
} from '@/shared/assets/images';
import { useAsync } from '@/shared/lib/async';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import DatePicker from 'primevue/datepicker';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import Spinner from 'primevue/progressspinner';
import RadioButton from 'primevue/radiobutton';
import Rating from 'primevue/rating';
import Select from 'primevue/select';
import { useRoute } from 'vue-router';

const route = useRoute();
const carAsync = useAsync(async () => {
  const { data } = await getCar<true>({ path: { id: Number(route.params.id) } });

  return data;
}, undefined);
const car = carAsync.state;
</script>
