

import { type Theme } from "@rainbow-me/rainbowkit";

const customRainbowKitTheme: Theme = {
  blurs: {
    modalOverlay: 'blur(4px)',
  },
  colors: {
    accentColor: '#6366f1', // indigo-500
    accentColorForeground: '#ffffff',
    actionButtonBorder: 'rgba(255, 255, 255, 0.1)',
    actionButtonBorderMobile: 'rgba(255, 255, 255, 0.1)',
    actionButtonSecondaryBackground: 'rgba(255, 255, 255, 0.08)',
    closeButton: '#9ca3af',
    closeButtonBackground: 'rgba(255, 255, 255, 0.08)',
    connectButtonBackground: '#1f2937',
    connectButtonBackgroundError: '#ef4444',
    connectButtonInnerBackground: 'linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))',
    connectButtonText: '#ffffff',
    connectButtonTextError: '#ffffff',
    connectionIndicator: '#10b981',
    downloadBottomCardBackground: '#1f2937',
    downloadTopCardBackground: '#111827',
    error: '#ef4444',
    generalBorder: 'rgba(255, 255, 255, 0.1)',
    generalBorderDim: 'rgba(255, 255, 255, 0.05)',
    menuItemBackground: 'rgba(255, 255, 255, 0.05)',
    modalBackdrop: 'rgba(0, 0, 0, 0.6)',
    modalBackground: '#1f2937',
    modalBorder: 'rgba(255, 255, 255, 0.1)',
    modalText: '#ffffff',
    modalTextDim: '#9ca3af',
    modalTextSecondary: '#9ca3af',
    profileAction: 'rgba(255, 255, 255, 0.1)',
    profileActionHover: 'rgba(255, 255, 255, 0.2)',
    profileForeground: 'rgba(255, 255, 255, 0.05)',
    selectedOptionBorder: 'rgba(99, 102, 241, 0.5)',
    standby: '#f59e0b',
  },
  fonts: {
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  radii: {
    actionButton: '8px',
    connectButton: '8px',
    menuButton: '8px',
    modal: '12px',
    modalMobile: '12px',
  },
  shadows: {
    connectButton: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    dialog: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    profileDetailsAction: '0 0 0 1px rgba(255, 255, 255, 0.1)',
    selectedOption: '0 0 0 1px #6366f1',
    selectedWallet: '0 0 0 1px #6366f1',
    walletLogo: '0 0 0 1px rgba(0, 0, 0, 0.1)',
  },
};

export { customRainbowKitTheme } ;