// import { Navigate, useLocation } from 'react-router';
// import { useAppSelector } from '@services/hooks';
// import { userDataSelector } from '@store/store';
// import Preloader from '@ui/preloader/preloader';

// type ProtectedRouteProps = {
//   onlyUnAuth?: boolean;
//   children: React.ReactElement;
// };

// export const ProtectedRoute = ({
//   onlyUnAuth,
//   children
// }: ProtectedRouteProps) => {
//   const user = useAppSelector(userDataSelector); 
//   const location = useLocation();
//   if (!isAuthChecked) {
//     return <Preloader />;
//   }
//   if (!onlyUnAuth && !user) {
//     return <Navigate replace to='/login' state={{ from: location }} />;
//   }
//   if (onlyUnAuth && user) {

//     const from = location.state?.from || { pathname: '/' };

//     return <Navigate replace to={from} />;
//   }

//   return children;
// };
