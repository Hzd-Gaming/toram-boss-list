export interface UseComponentStoreProps {
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  sidebarType: 'filter' | 'info';
  updateIsDarkMode: (value: boolean) => void;
  updateIsSidebarOpen: (value: boolean) => void;
  updateSidebarType: (value: 'filter' | 'info') => void;
}
