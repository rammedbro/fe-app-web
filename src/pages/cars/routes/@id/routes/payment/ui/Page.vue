<template>
  <div class="container mx-auto py-8">
    <h1 class="mb-8 text-3xl font-bold">{{ t('pages.cars/@id/payment.title') }}</h1>
    <div class="flex flex-col-reverse gap-4 lg:flex-row lg:items-start">
      <form class="lg:w-2/3" @submit="submit">
        <section id="billing-info" class="p-card mb-6 p-6">
          <div class="relative mb-6">
            <div class="mb-1 text-xl font-bold">{{ t('pages.cars/@id/payment.form.sections.billing-info.title') }}</div>
            <div class="text-sm text-surface-400">
              {{ t('pages.cars/@id/payment.form.sections.billing-info.subtitle') }}
            </div>

            <div class="absolute top-0 right-0 text-sm text-surface-400">
              {{ t('pages.cars/@id/payment.form.sections.billing-info.step') }}
            </div>
          </div>

          <div class="grid gap-6 sm:grid-cols-2">
            <div class="grid auto-rows-min gap-2">
              <div class="font-semibold">
                {{ t('pages.cars/@id/payment.form.sections.billing-info.inputs.name.label') }}
              </div>
              <InputText
                v-model="order.name.value"
                name="name"
                variant="filled"
                :placeholder="t('pages.cars/@id/payment.form.sections.billing-info.inputs.name.placeholder')"
                class="w-full"
              />
              <div v-if="order.errors.value.name" class="text-sm text-error">{{ order.errors.value.name }}</div>
            </div>

            <div class="grid auto-rows-min gap-2">
              <div class="font-semibold">
                {{ t('pages.cars/@id/payment.form.sections.billing-info.inputs.phone.label') }}
              </div>
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
              <div class="font-semibold">
                {{ t('pages.cars/@id/payment.form.sections.billing-info.inputs.address.label') }}
              </div>
              <InputText
                v-model="order.address.value"
                name="address"
                variant="filled"
                :placeholder="t('pages.cars/@id/payment.form.sections.billing-info.inputs.address.placeholder')"
                class="w-full"
              />
              <div v-if="order.errors.value.address" class="text-sm text-error">{{ order.errors.value.address }}</div>
            </div>

            <div class="grid auto-rows-min gap-2">
              <div class="font-semibold">
                {{ t('pages.cars/@id/payment.form.sections.billing-info.inputs.city.label') }}
              </div>
              <InputText
                v-model="order.city.value"
                name="city"
                variant="filled"
                :placeholder="t('pages.cars/@id/payment.form.sections.billing-info.inputs.city.placeholder')"
                class="w-full"
              />
              <div v-if="order.errors.value.city" class="text-sm text-error">{{ order.errors.value.city }}</div>
            </div>
          </div>
        </section>

        <section id="rental-info" class="p-card mb-6 p-6">
          <div class="relative mb-6">
            <div class="mb-1 text-xl font-bold">
              {{ t('pages.cars/@id/payment.form.sections.rental-info.title') }}
            </div>
            <div class="text-sm text-surface-400">
              {{ t('pages.cars/@id/payment.form.sections.rental-info.subtitle') }}
            </div>

            <div class="absolute top-0 right-0 text-sm text-surface-400">
              {{ t('pages.cars/@id/payment.form.sections.rental-info.step') }}
            </div>
          </div>

          <Stepper value="1">
            <StepList>
              <Step value="1">
                {{ t('pages.cars/@id/payment.form.sections.rental-info.sections.pickup.title') }}
              </Step>
              <Step value="2">
                {{ t('pages.cars/@id/payment.form.sections.rental-info.sections.dropoff.title') }}
              </Step>
            </StepList>
            <StepPanels>
              <StepPanel value="1" class="p-4">
                <div class="mb-4 grid gap-2">
                  <div class="font-semibold">
                    {{ t('pages.cars/@id/payment.form.sections.rental-info.sections.pickup.inputs.location.label') }}
                  </div>
                  <Map v-model="order.pickupLocation.value" locate search class="h-60 lg:h-80" />
                  <div v-if="order.errors.value['pickup.location']" class="text-sm text-error">
                    {{ order.errors.value['pickup.location'] }}
                  </div>
                </div>

                <div class="grid gap-6 sm:grid-cols-2">
                  <div class="grid gap-2">
                    <div class="font-semibold">
                      {{ t('pages.cars/@id/payment.form.sections.rental-info.sections.pickup.inputs.date.label') }}
                    </div>
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
                    <div class="font-semibold">
                      {{ t('pages.cars/@id/payment.form.sections.rental-info.sections.pickup.inputs.time.label') }}
                    </div>
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
                  <div class="font-semibold">
                    {{ t('pages.cars/@id/payment.form.sections.rental-info.sections.dropoff.inputs.location.label') }}
                  </div>
                  <Map v-model="order.dropoffLocation.value" locate search class="h-60 lg:h-80" />
                  <div v-if="order.errors.value['dropoff.location']" class="text-sm text-error">
                    {{ order.errors.value['dropoff.location'] }}
                  </div>
                </div>

                <div class="grid gap-6 sm:grid-cols-2">
                  <div class="grid gap-2">
                    <div class="font-semibold">
                      {{ t('pages.cars/@id/payment.form.sections.rental-info.sections.dropoff.inputs.date.label') }}
                    </div>
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
                    <div class="font-semibold">
                      {{ t('pages.cars/@id/payment.form.sections.rental-info.sections.dropoff.inputs.time.label') }}
                    </div>
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

        <section id="payment-method" class="p-card mb-6 p-6">
          <div class="relative mb-6">
            <div class="mb-1 text-xl font-bold">
              {{ t('pages.cars/@id/payment.form.sections.payment-method.title') }}
            </div>
            <div class="text-sm text-surface-400">
              {{ t('pages.cars/@id/payment.form.sections.payment-method.subtitle') }}
            </div>

            <div class="absolute top-0 right-0 text-sm text-surface-400">
              {{ t('pages.cars/@id/payment.form.sections.payment-method.step') }}
            </div>
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
              <div class="font-semibold">
                {{ t('pages.cars/@id/payment.form.sections.payment-method.inputs.card-number.label') }}
              </div>
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
              <div class="font-semibold">
                {{ t('pages.cars/@id/payment.form.sections.payment-method.inputs.card-expires.label') }}
              </div>
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
              <div class="font-semibold">
                {{ t('pages.cars/@id/payment.form.sections.payment-method.inputs.card-cvc.label') }}
              </div>
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

        <section id="confirmation" class="p-card p-6">
          <div class="relative mb-6">
            <div class="mb-1 text-xl font-bold">
              {{ t('pages.cars/@id/payment.form.sections.confirmation.title') }}
            </div>
            <div class="text-sm text-surface-400">
              {{ t('pages.cars/@id/payment.form.sections.confirmation.subtitle') }}
            </div>

            <div class="absolute top-0 right-0 text-sm text-surface-400">
              {{ t('pages.cars/@id/payment.form.sections.confirmation.step') }}
            </div>
          </div>

          <div class="mb-4">
            <div class="flex items-center rounded-lg bg-surface-200 px-6 py-4 dark:bg-surface-700">
              <Checkbox
                v-model="order.newsletterConfirmation.value"
                input-id="confirmation.newsletter"
                name="confirmation.newsletter"
                binary
                class="mr-4"
              />
              <label for="confirmation.newsletter">
                {{ t('pages.cars/@id/payment.form.sections.confirmation.inputs.newsletter.label') }}
              </label>
            </div>
          </div>

          <div class="mb-8 grid gap-2">
            <div class="flex items-center rounded-lg bg-surface-200 px-6 py-4 dark:bg-surface-700">
              <Checkbox
                v-model="order.policiesConfirmation.value"
                input-id="confirmation.policies"
                name="confirmation.policies"
                binary
                class="mr-4"
              />
              <I18nT
                keypath="pages.cars/@id/payment.form.sections.confirmation.inputs.policies.label"
                tag="label"
                for="confirmation.policies"
              >
                <template #terms>
                  <RouterLink :to="{ name: TermsOfServiceRouteName }" class="mx-1 underline">
                    {{ t('pages.cars/@id/payment.form.links.terms') }}
                  </RouterLink>
                </template>
                <template #policy>
                  <RouterLink :to="{ name: PrivacyPolicyRouteName }" class="mx-1 underline">
                    {{ t('pages.cars/@id/payment.form.links.policy') }}
                  </RouterLink>
                </template>
              </I18nT>
            </div>
            <div v-if="order.errors.value['confirmation.policies']" class="text-sm text-error">
              {{ order.errors.value['confirmation.policies'] }}
            </div>
          </div>

          <Button
            type="submit"
            :label="t('pages.cars/@id/payment.form.buttons.submit')"
            :loading="order.isSubmitting.value"
            size="large"
            class="mb-8 w-full"
          />

          <div class="mb-2 flex items-center gap-4">
            <img :src="securitySafetyImgUrl" alt="security-safety" class="w-10" />
            <div>
              <div class="font-semibold">
                {{ t('pages.cars/@id/payment.form.sections.data-safety.title') }}
              </div>
              <div class="text-sm text-surface-400">
                {{ t('pages.cars/@id/payment.form.sections.data-safety.subtitle') }}
              </div>
            </div>
          </div>
        </section>
      </form>

      <aside class="p-card p-6 lg:w-1/3">
        <template v-if="car">
          <div class="mb-8">
            <div class="mb-1 text-xl font-bold">
              {{ t('pages.cars/@id/payment.aside.title') }}
            </div>
            <div class="text-sm text-surface-400">
              {{ t('pages.cars/@id/payment.aside.subtitle') }}
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-4">
            <img :src="car.images[0]" alt="Placeholder image" class="rounded-lg md:max-w-72" />
            <div>
              <div class="mb-2 text-4xl font-bold">{{ car.brand }} {{ car.model }}</div>
              <div class="flex items-center gap-2">
                <Rating :model-value="Number(car.rating)" readonly />
                <div class="text-sm text-surface-500">
                  {{ t('entities.car.fields.views.value', [car.views]) }}
                </div>
              </div>
            </div>
          </div>

          <div class="p-divider-horizontal" />

          <div class="mb-2 flex justify-between">
            <div class="text-surface-400">{{ t('entities.car.fields.price.label') }}</div>
            <div class="font-semibold">${{ car.price }}</div>
          </div>

          <div class="mb-8 flex justify-between">
            <div class="text-surface-400">{{ t('entities.car.fields.discount.label') }}</div>
            <div class="font-semibold">{{ car.discount }}%</div>
          </div>

          <div class="flex items-center justify-between gap-4">
            <div>
              <div class="text-xl font-bold">
                {{ t('pages.cars/@id/payment.aside.sections.price.title') }}
              </div>
              <div class="text-sm text-surface-400">
                {{ t('pages.cars/@id/payment.aside.sections.price.subtitle') }}
              </div>
            </div>

            <div class="text-4xl font-bold">${{ calcDiscountPrice(car.price, car.discount) }}</div>
          </div>
        </template>
        <Spinner v-else class="mx-auto block" />
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mergeCarMessages, useCarQuery } from '@/entities/car';
import { addOrder, useAddOrderStore } from '@/entities/order';
import messages from '@/pages/cars/routes/@id/routes/payment/i18n/messages.json';
import {
  bitcoinImgUrl,
  mastercardImgUrl,
  paypalImgUrl,
  securitySafetyImgUrl,
  visaImgUrl,
} from '@/shared/assets/images';
import { logError } from '@/shared/lib/log';
import { calcDiscountPrice } from '@/shared/lib/numbers';
import { PrivacyPolicyRouteName, ProfileDashboardRouteName, TermsOfServiceRouteName } from '@/shared/model/routes';
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
import { I18nT, useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const props = defineProps<{ id: number }>();
const { t } = useI18n({ messages: mergeCarMessages(messages) });
const router = useRouter();
const toast = useToast();
const orderStore = useAddOrderStore();
const order = storeToRefs(orderStore);
const { data: car } = useCarQuery(() => props.id).query();

const submit = orderStore.handleSubmit(async (values) => {
  if (!car.value) {
    toast.add({
      severity: 'error',
      summary: t('pages.cars/@id/payment.form.messages.error.500.message'),
      detail: t('pages.cars/@id/payment.form.messages.error.500.details'),
      life: 5000,
    });
    return;
  }

  const { data, error } = await addOrder<false>({
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
      price: calcDiscountPrice(car.value.price, car.value.discount),
    },
    throwOnError: false,
  });

  if (typeof data === 'number') {
    toast.add({
      severity: 'success',
      summary: t('pages.cars/@id/payment.form.messages.success.message'),
      detail: t('pages.cars/@id/payment.form.messages.success.details'),
      life: 5000,
    });
    router.push({ name: ProfileDashboardRouteName });
    orderStore.resetForm();
    return;
  }

  if (typeof error === 'object') {
    if (error.code === 'SCHEMA_VALIDATION_ERROR') {
      orderStore.setErrors(error.details);
      return;
    }
  }

  logError(error);
  toast.add({
    severity: 'error',
    summary: t('pages.cars/@id/payment.form.messages.error.500.message'),
    detail: t('pages.cars/@id/payment.form.messages.error.500.details'),
    life: 5000,
  });
});
</script>
