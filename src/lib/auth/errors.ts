export const getAuthErrorMessage = (error: any): string => {
  if (!navigator.onLine) {
    return 'No internet connection. Please check your network and try again.';
  }

  switch (error?.code) {
    case 'auth/network-request-failed':
      return 'Unable to connect to authentication service. Please check your connection.';
    case 'auth/popup-blocked':
      return 'Popup was blocked. Please allow popups or try another sign-in method.';
    case 'auth/unauthorized-domain':
      return 'Authentication is not configured for this domain. Please try another method.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please check your email or sign up.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    default:
      return error?.message || 'An error occurred during authentication. Please try again.';
  }
};