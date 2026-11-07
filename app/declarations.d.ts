// Déclarations pour les fichiers JSX

declare module '*.jsx' {
  const content: any;
  export default content;
}

declare module './components/Navbar' {
  const Navbar: React.FC;
  export default Navbar;
}

declare module './components/Footer' {
  const Footer: React.FC;
  export default Footer;
}

declare module './components/VoyageCard' {
  const VoyageCard: React.FC<any>;
  export default VoyageCard;
}

declare module './components/LoadingSpinner' {
  const LoadingSpinner: React.FC<any>;
  export default LoadingSpinner;
}

declare module './pages/Home' {
  const Home: React.FC;
  export default Home;
}

declare module './pages/Login' {
  const Login: React.FC;
  export default Login;
}

declare module './pages/Register' {
  const Register: React.FC;
  export default Register;
}

declare module './pages/Reservations' {
  const Reservations: React.FC;
  export default Reservations;
}

declare module './services/api' {
  export const register: (data: any) => Promise<any>;
  export const login: (data: any) => Promise<any>;
  export const logout: () => void;
  export const getCurrentUser: () => any;
  export const isAuthenticated: () => boolean;
  export const getVoyages: (params?: any) => Promise<any>;
  export const getVoyageById: (id: number) => Promise<any>;
  export const createVoyage: (data: any) => Promise<any>;
  export const getReservations: (userId: number, type?: string) => Promise<any>;
  export const createReservation: (data: any) => Promise<any>;
  export const cancelReservation: (reservationId: number, userId: number) => Promise<any>;
}
