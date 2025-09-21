import { StytchUIClient } from "https://www.unpkg.com/@stytch/vanilla-js@2.0/dist/index.esm.js";
import { Products } from 'https://www.unpkg.com/@stytch/vanilla-js@0.9.5/dist/index.esm.js';

export const stytch = new StytchUIClient(STYTCH_PUBLIC_TOKEN);

const REDIRECT_URL = 'http://localhost:3001/';
const config = {
  products: [Products.emailMagicLinks],
  emailMagicLinksOptions: {
    loginRedirectURL: REDIRECT_URL,
    loginExpirationMinutes: 60,
    signupRedirectURL: REDIRECT_URL,
    signupExpirationMinutes: 60,
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
