import LoginForm from './components/Login';
import PatientList from "./components/PatientList";
import PatientDetails from "./components/PatientDetails";
import Unauthorized from './components/Unauthorized';

const AppRoutes = [
  {
    index: true,
    element: <LoginForm />
  },
  {
    path: '/patients',
    element: <PatientList />
  },
  {
    path: '/patient/:id',
    element: <PatientDetails />
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />
  }
];

export default AppRoutes;
