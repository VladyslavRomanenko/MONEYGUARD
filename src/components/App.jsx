import { Route, Routes, useNavigate } from 'react-router-dom';
import { LoginPage } from 'page/LoginPage/LoginPage';
import SummaryPage from 'page/SummaryPage/SummaryPage';
import { useDispatch, useSelector } from 'react-redux';
import { selectRefresh, selectUser } from 'redux/auth/authSelectors';
import { useEffect } from 'react';
import { refreshUser } from 'redux/auth/authOperations';
import { RegistrationPage } from 'page/RegistrationPage/RegistrationPage';
import { getCurrencyThunk } from 'redux/currency/currencyOperations';
import { refreshCurrencyDate } from 'redux/currency/currencySlice';
import { selectCurrencyDate } from 'redux/currency/currencySelectors';
import DashboardPage from 'page/DashboardPage/DashboardPage';
import Header from './Header/Header';
import { Currency } from './Currency/Currency';
import { Loader } from './Loader/Loader';
import { useMediaQuery } from 'react-responsive';
import { PrivateRouter } from 'hoc/PrivateRouter';
import { PublicRouter } from 'hoc/PublicRouter';

export const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectUser);

  const currencyDate = useSelector(selectCurrencyDate);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(refreshUser());
    }
  }, [isLoggedIn, navigate, dispatch]);

  useEffect(() => {
    const oneHour = 3600000;
    const time = Date.now();
    const diffTime = new Date() - new Date(currencyDate);

    // console.log(diffTime);
    if (diffTime < oneHour) {
      return;
    }
    dispatch(refreshCurrencyDate(time));
    dispatch(getCurrencyThunk());
  }, [dispatch, currencyDate]);

  const refresh = useSelector(selectRefresh);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return refresh ? (
    <>
      <Loader />
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>Loader...</h1>
    </>
  ) : (
    // <Routes>
    //   <Route path="/login" element={<LoginPage />} />
    //   <Route path="/register" element={<RegistrationPage />} />
    //   <Route path="/" element={<Header />}>
    //     <Route path="/home" element={<DashboardPage />} />
    //     <Route path="/statistic" element={<h1>Statistics</h1>} />

    //     {isMobile && <Route path="/currency" element={<Currency />} />}

    //     <Route path="*" element={<h1> Error</h1>} />
    //   </Route>
    // </Routes>

    <Routes>
      <Route path="/" element={<Header />}>
        {/* <Route index element={<Navigate to="/home" />}></Route> */}

        <Route
          path="/home"
          element={
            <PrivateRouter>
              <DashboardPage />
            </PrivateRouter>
          }
        ></Route>

        <Route
          path="/statistic"
          element={
            <PrivateRouter>
              <SummaryPage />
            </PrivateRouter>
          }
        ></Route>

        {isMobile && (
          <Route
            path="/currency"
            element={
              <PrivateRouter>
                <Currency />
              </PrivateRouter>
            }
          ></Route>
        )}

        {/* <Route
          path="/currency"
          element={
            <PrivateRouter>
              <Currency />
            </PrivateRouter>
          }
        ></Route> */}
      </Route>

      <Route
        path="/login"
        element={
          <PublicRouter>
            <LoginPage />
          </PublicRouter>
        }
      ></Route>

      <Route
        path="/register"
        element={
          <PublicRouter>
            <RegistrationPage />
          </PublicRouter>
        }
      ></Route>

      <Route path="*" element={<h1> Error</h1>} />
    </Routes>
  );
};
