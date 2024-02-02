import { defineStore } from 'pinia';
import keycloakService from '@services/keycloak';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      authenticated: false,
      user: {},
    };
  },
  persist: true,
  getters: {},
  actions: {
    // Initialize Keycloak OAuth
    async initOauth(keycloak, clearData = true) {
      if (clearData) {
        this.clearUserData();
      }

      this.authenticated = keycloak.authenticated;
      this.user.username = keycloak.tokenParsed.preferred_username;
      this.user.family_name = keycloak.tokenParsed.family_name;
      this.user.given_name = keycloak.tokenParsed.given_name;
      this.user.roles =
        keycloak.tokenParsed.resource_access[
          import.meta.env.VITE_KEYCLOAK_CLIENT_ID
        ].roles;
      this.user.token = keycloak.token;
      this.user.refToken = keycloak.refreshToken;
    },
    // Logout user
    async logout() {
      try {
        keycloakService.CallLogout(import.meta.env.VITE_APP_URL);
        this.clearUserData();
      } catch (error) {
        console.error(error);
      }
    },
    // Refresh user's token
    async refreshUserToken() {
      try {
        const keycloak = await keycloakService.CallTokenRefresh();
        this.initOauth(keycloak, true);
      } catch (error) {
        console.error(error);
      }
    },
    // Clear user's store data
    clearUserData() {
      this.authenticated = false;
      this.user = {};
    },
  },
});
