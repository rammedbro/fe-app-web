import { defineComponent, type SlotsType } from 'vue';
import { RouterLink } from 'vue-router';
import style from './Nav.module.css';

export default defineComponent({
  name: 'Navigation',
  props: {
    title: {
      type: String,
      default: 'Navigation',
    },
  },
  slots: Object as SlotsType<{
    title(props: { title: string }): any,
  }>,
  setup({ title }, { slots }) {
    return () => [
      <h4>{ slots.title ? slots.title({ title }) : title }</h4>,
      <nav class={ style.nav }>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/auth">Auth</RouterLink>
        <RouterLink to="/help/privacy-policy">Privacy policy</RouterLink>
        <RouterLink to="/help/terms-of-service">Terms of service</RouterLink>
      </nav>,
    ];
  },
});
