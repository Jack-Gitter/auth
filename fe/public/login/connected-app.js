import { StytchB2BUIClient } from '@stytch/vanilla-js/b2b';

const stytch = new StytchB2BUIClient('public-token-test-3d5ee7dd-f46e-4831-9b87-ad30dd8d39b0');

export const mountIdentityProvider = () => {
  const styles = { fontFamily: 'Arial' };
  stytch.mountIdentityProvider({
    elementId: '#stytch-idp-container',
    styles,
  });
};
