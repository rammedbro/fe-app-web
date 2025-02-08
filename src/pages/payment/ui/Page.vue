<template>
  <div class="container flex flex-col-reverse lg:flex-row lg:items-start gap-4 py-8 mx-auto">
    <div class="lg:w-2/3">
      <section class="bg-white drop-shadow-md rounded-lg p-6 mb-6">
        <div class="relative mb-6">
          <div class="text-xl font-bold mb-1">Billing Info</div>
          <div class="text-sm text-content-300">Please enter your billing info</div>

          <div class="text-sm text-content-300 absolute top-0 right-0">Step 1 of 4</div>
        </div>

        <div class="grid sm:grid-cols-2 gap-6">
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

      <section class="bg-white drop-shadow-md rounded-lg p-6 mb-6">
        <div class="relative mb-6">
          <div class="text-xl font-bold mb-1">Rental Info</div>
          <div class="text-sm text-content-300">Please select your rental date</div>

          <div class="text-sm text-content-300 absolute top-0 right-0">Step 2 of 4</div>
        </div>

        <section class="mb-4">
          <div class="font-bold mb-4">Pick-Up</div>
          <div class="grid sm:grid-cols-2 gap-6">
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
          <div class="font-bold mb-4">Drop-Off</div>
          <div class="grid sm:grid-cols-2 gap-6">
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

      <section class="bg-white drop-shadow-md rounded-lg p-6 mb-6">
        <div class="relative mb-6">
          <div class="text-xl font-bold mb-1">Payment Method</div>
          <div class="text-sm text-content-300">Please enter your payment method</div>

          <div class="text-sm text-content-300 absolute top-0 right-0">Step 3 of 4</div>
        </div>

        <label class="flex items-center gap-4 bg-gray cursor-pointer rounded-lg px-6 py-4 mb-4">
          <RadioButton />
          <span>Credit Card</span>
          <img :src="visaImgUrl" alt="visa" class="h-4 ml-auto" />
          <img :src="mastercardImgUrl" alt="mastercard" class="h-4" />
        </label>

        <label class="flex items-center gap-4 bg-gray cursor-pointer rounded-lg px-6 py-4 mb-4">
          <RadioButton />
          <span>PayPal</span>
          <img :src="paypalImgUrl" alt="paypal" class="h-4 ml-auto" />
        </label>

        <label class="flex items-center gap-4 bg-gray cursor-pointer rounded-lg px-6 py-4 mb-4">
          <RadioButton />
          <span>Bitcoin</span>
          <img :src="bitcoinImgUrl" alt="bitcoin" class="h-4 ml-auto" />
        </label>
      </section>

      <section class="bg-white drop-shadow-md rounded-lg p-6">
        <div class="relative mb-6">
          <div class="text-xl font-bold mb-1">Confirmation</div>
          <div class="text-sm text-content-300">
            We are getting to the end. Just few clicks and your rental is ready!
          </div>

          <div class="text-sm text-content-300 absolute top-0 right-0">Step 4 of 4</div>
        </div>

        <div class="flex items-center bg-gray rounded-lg px-6 py-4 mb-4">
          <Checkbox class="mr-4" />
          <div>I agree with sending marketing and newsletter emails</div>
        </div>

        <div class="flex items-center bg-gray rounded-lg px-6 py-4 mb-8">
          <Checkbox class="mr-4" />
          <div>I agree with our terms and conditions and privacy policy</div>
        </div>

        <Button type="submit" label="Rent Now" class="mb-8" />

        <img :src="securitySafetyImgUrl" alt="security-safety" class="w-8 mb-2" />
        <div class="font-semibold mb-2">All your data are safe</div>
        <div class="text-sm text-content-300">
          We are using the most advanced security to provide you the best experience ever.
        </div>
      </section>
    </div>

    <aside class="lg:w-1/3 bg-white drop-shadow-md rounded-lg p-6">
      <template v-if="carAsync.isReady.value && car">
        <div class="mb-8">
          <div class="text-xl font-bold mb-1">Rental Summary</div>
          <div class="text-sm text-content-300">
            Prices may change depending on the length of the rental and the price of your rental car.
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <img :src="car.images[0]" alt="Placeholder image" class="md:max-w-72 rounded-lg" />
          <div>
            <div class="text-4xl font-bold mb-2">{{ car.brand }} {{ car.model }}</div>
            <div class="flex items-center gap-2">
              <Rating :model-value="Number(car.rating)" readonly />
              <div class="text-sm text-content-400">{{ car.views }} Reviews</div>
            </div>
          </div>
        </div>

        <Divider />

        <div class="flex justify-between mb-2">
          <div class="text-content-300">Subtotal</div>
          <div class="font-semibold">${{ car.price }}</div>
        </div>

        <div class="flex justify-between mb-8">
          <div class="text-content-300">Discount</div>
          <div class="font-semibold">${{ car.discount }}</div>
        </div>

        <InputText id="promo-code" variant="filled" placeholder="Apply promo code" class="w-full mb-8" />

        <div class="flex items-center justify-between gap-4">
          <div>
            <div class="text-xl font-bold">Total Rental Price</div>
            <div class="text-sm text-content-300">Overall price and includes rental discount</div>
          </div>

          <div class="text-4xl font-bold">${{ ((Number(car.price) * (100 - car.discount)) / 100).toFixed(2) }}</div>
        </div>
      </template>
      <Spinner v-else class="block mx-auto" />
    </aside>
  </div>
</template>

<script setup lang="ts">
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
import { getCar } from '@/shared/api';
import {
  bitcoinImgUrl,
  mastercardImgUrl,
  paypalImgUrl,
  securitySafetyImgUrl,
  visaImgUrl,
} from '@/shared/assets/images';
import { useAsync } from '@/shared/lib/async';

const route = useRoute();
const carAsync = useAsync(async () => {
  const { data } = await getCar<true>({ path: { id: Number(route.params.id) } });

  return data;
}, undefined);
const car = carAsync.state;
</script>
