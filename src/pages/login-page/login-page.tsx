import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus, ERROR_MESSAGE_TIMEOUT, RequestStatus } from '../../const';
import { useCallback, useEffect, useRef } from 'react';
import { selectAuthorizationStatus } from '../../store/user/user';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { loginAction } from '../../store/user/api-action';
import { redirectToRoute } from '../../store/main/main';
import { toast } from 'react-toastify';
import './login-page.css';

type LocationState = {
  from: AppRoute;
}

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const locationState = useLocation()?.state as LocationState;
  const fromLocationRef = useRef<AppRoute>(locationState?.from);
  const { register, handleSubmit, getValues, clearErrors, formState: { errors } } = useForm();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  const handleLoginSubmit: SubmitHandler<FieldValues> = useCallback(() => {

    const email = getValues('email') as string;
    const password = getValues('password') as string;

    dispatch(loginAction({
      login: email,
      password: password
    }))
      .unwrap()
      .then(() => {
        dispatch(redirectToRoute(fromLocationRef.current));
      })
      .catch((error) => {
        if (error === RequestStatus.Error) {
          toast.warn('Не удалось авторизоваться');
        }
      });
  }, [dispatch, getValues]);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authorizationStatus, navigate]);

  useEffect(() => {
    if (errors.userAgreement) {
      setTimeout(() => clearErrors('userAgreement'), ERROR_MESSAGE_TIMEOUT);
    }
  }, [clearErrors, errors.userAgreement]);


  return (
    <main className="decorated-page login">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x" /><img src="img/content/maniac/maniac-size-m.jpg" srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x" width="1366" height="768" alt="" />
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="login__form">
          <form className="login-form" action="https://echo.htmlacademy.ru/" method="post" onSubmit={(evt) => {
            evt.preventDefault();
            void handleSubmit(handleLoginSubmit)(evt);
          }}
          >
            <div className="login-form__inner-wrapper">
              <h1 className="title title--size-s login-form__title">Вход</h1>
              <div className="login-form__inputs">
                <div className={`custom-input ${errors.email ? 'custom-input--invalid' : ''} login-form__input`}>
                  <label className="custom-input__label" htmlFor="email">E&nbsp;&ndash;&nbsp;mail</label>
                  <input type="email" id="email" placeholder="Адрес электронной почты"
                    {...register('email',
                      { required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email?.type === 'required' && <span className="custom-input__invalid-text">{'Укажите email'}</span>}
                  {errors.email?.type === 'pattern' && <span className="custom-input__invalid-text">{'Некорректный email'}</span>}
                </div>
                <div className={`custom-input ${errors.password ? 'custom-input--invalid' : ''} login-form__input`}>
                  <label className="custom-input__label" htmlFor="password">Пароль</label>
                  <input type="password" id="password" placeholder="Пароль"
                    {...register('password',
                      { required: true,
                        pattern: /^(?=.*[a-zA-Zа-яА-ЯёЁ])(?=.*\d).+$/,
                        minLength: 3,
                        maxLength: 15 })}
                    aria-invalid={errors.password ? 'true' : 'false'}
                  />
                  {errors.password?.type === 'required' && <span className="custom-input__invalid-text">{'Введите пароль'}</span>}
                  {errors.password?.type === 'pattern' && <span className="custom-input__invalid-text">{'Пароль должен содержать минимум одну букву и цифру'}</span>}
                  {(errors.password?.type === 'minLength' || errors.password?.type === 'maxLength') && <span className="custom-input__invalid-text">{'Пароль должен содержать от 3 до 15 символов'}</span>}
                </div>
              </div>
              <button className="btn btn--accent btn--general login-form__submit" type="submit">Войти</button>
            </div>
            <label className="custom-checkbox login-form__checkbox">
              <input type="checkbox" id="id-order-agreement" {...register('userAgreement', { required: true })} aria-invalid={errors.userAgreement ? 'true' : 'false'} />
              <span className="custom-checkbox__icon">
                <svg width="20" height="17" aria-hidden="true">
                  <use xlinkHref="#icon-tick"></use>
                </svg>
              </span>
              <span className={`custom-checkbox__label ${errors.userAgreement ? 'custom-checkbox__label--invalid' : ''}`}>Я&nbsp;согласен с&nbsp;
                <a className="link link--active-silver link--underlined" href="#">правилами обработки персональных данных</a>&nbsp;и пользовательским соглашением
              </span>
            </label>
          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
