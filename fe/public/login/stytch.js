import { StytchUIClient } from "https://www.unpkg.com/@stytch/vanilla-js@2.0/dist/index.esm.js";
import { Products } from 'https://www.unpkg.com/@stytch/vanilla-js@0.9.5/dist/index.esm.js';

export const stytch = new StytchUIClient('public-token-test-3d5ee7dd-f46e-4831-9b87-ad30dd8d39b0');

const REDIRECT_URL = 'http://localhost:3000/login/stytch';
const config = {
  products: [Products.emailMagicLinks],
  emailMagicLinksOptions: {
    loginRedirectURL: REDIRECT_URL,
    loginExpirationMinutes: 60,
    signupRedirectURL: REDIRECT_URL,
    signupExpirationMinutes: 60,
  },
};

const styles = {
  container: {
    width: '100%',
  },
  buttons: {
    primary: {
      backgroundColor: '#4A37BE',
      borderColor: '#4A37BE',
    },
  },
};

const callbacks = {
  onEvent: (message) => console.log(message),
  onError: (error) => console.log(error),
};

stytch.mountLogin({
  elementId: '#stytch-sdk',
  styles,
  config,
  callbacks,
});
