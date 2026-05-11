import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { QuestBooking, QuestFull } from '../../types/quest';
import { useState, useEffect, SyntheticEvent, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectQuestBookingStatus } from '../../store/quest/quest';
import { RequestStatus, QuestDate, AppRoute, ERROR_MESSAGE_TIMEOUT } from '../../const';
import { postQuestBookingAction } from '../../store/quest/api-action';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addReservedQuest } from '../../store/main/main';
import '../../pages/login-page/login-page.css';


type BookingFormProps = {
  currentBookingPlace: QuestBooking;
  currentQuest: QuestFull | null;
}

function BookingForm({currentBookingPlace, currentQuest}: BookingFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, getValues, clearErrors, reset, formState: { errors, isSubmitting } } = useForm();
  const [selectedDate, setSelectedDate] = useState({value: '', placeId: ''});
  const questBookingStatus = useAppSelector(selectQuestBookingStatus);

  useEffect(() => {
    if (errors.userAgreement) {
      setTimeout(() => clearErrors('userAgreement'), ERROR_MESSAGE_TIMEOUT);
    }
  }, [clearErrors, errors.userAgreement]);

  const handleBookingSubmit: SubmitHandler<FieldValues> = useCallback(async () => {
    const date = selectedDate.value.includes(QuestDate.Today) ? QuestDate.Today : QuestDate.Tomorrow;
    const time = selectedDate.value.split(date)[1];

    await dispatch(postQuestBookingAction(
      {
        date: date,
        time: time,
        contactPerson: getValues('name') as string,
        withChildren: getValues('children') as boolean,
        peopleCount: Number(getValues('person')),
        phone: getValues('tel') as string,
        placeId: selectedDate.placeId,
        questId: currentQuest?.id as string
      },
    ))
      .unwrap()
      .then((reservedQuest) => {
        setSelectedDate({...selectedDate, value: '', placeId: ''});
        reset();
        dispatch(addReservedQuest(reservedQuest));
        navigate(AppRoute.Reservation);
      })
      .catch((rejectedValue) => {
        if (rejectedValue === RequestStatus.Error) {
          toast.warn('Не удалось забронировать квест');
        }
      });
  }, [currentQuest?.id, dispatch, getValues, navigate, reset, selectedDate]);

  const handleInputBlur = useCallback((evt: SyntheticEvent & { target: HTMLInputElement }) => {
    evt.target.value = evt.target.value.trim();
  }, []);

  return (
    <form className="booking-form" action="https://echo.htmlacademy.ru/" method="post" onSubmit={(evt) => {
      evt.preventDefault();
      void handleSubmit(handleBookingSubmit)(evt);
    }}
    >
      <fieldset className="booking-form__section" style={{position: 'relative'}}>
        <legend className="visually-hidden">Выбор даты и времени</legend>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Сегодня</legend>
          <div className="booking-form__date-inner-wrapper">
            {currentBookingPlace.slots.today.map((slot) => (
              <label key={slot.time} className="custom-radio booking-form__date">
                <input
                  type="radio"
                  id={`today${slot.time}`}
                  value={`today${slot.time}`}
                  checked={`${selectedDate.value}` === `today${slot.time}` && selectedDate.placeId === currentBookingPlace.id}
                  {...register('date',
                    { required: true,
                      onChange: (evt: SyntheticEvent & { target: HTMLInputElement }) => setSelectedDate({ ...selectedDate, value: evt.target.value, placeId: currentBookingPlace.id }) })}
                  disabled={slot.isAvailable === false}
                  aria-invalid={errors.date ? 'true' : 'false'}
                /><span className="custom-radio__label">{slot.time}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Завтра</legend>
          <div className="booking-form__date-inner-wrapper">
            {currentBookingPlace.slots.tomorrow.map((slot) => (
              <label key={slot.time} className="custom-radio booking-form__date">
                <input
                  type="radio"
                  id={`tomorrow${slot.time}`}
                  value={`tomorrow${slot.time}`}
                  checked={`${selectedDate.value}` === `tomorrow${slot.time}` && selectedDate.placeId === currentBookingPlace.id}
                  {...register('date',
                    { required: true,
                      onChange: (evt: SyntheticEvent & { target: HTMLInputElement }) => setSelectedDate({ ...selectedDate, value: evt.target.value, placeId: currentBookingPlace.id }) })}
                  disabled={slot.isAvailable === false}
                  aria-invalid={errors.date ? 'true' : 'false'}
                /><span className="custom-radio__label">{slot.time}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {errors.date && <span className="custom-input__invalid-text">{'Выберите подходящую дату'}</span>}
      </fieldset>
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Контактная информация</legend>
        <div className={`custom-input ${errors.name ? 'custom-input--invalid' : ''} booking-form__input`}>
          <label className="custom-input__label" htmlFor="name">Ваше имя</label>
          <input type="text" id="name" placeholder="Имя"
            {...register('name',
              { required: true,
                pattern: /[А-Яа-яЁёA-Za-z'-]/,
                minLength: 1,
                maxLength: 15,
                onBlur: handleInputBlur })}
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name?.type === 'required' && <span className="custom-input__invalid-text">{'Введите имя'}</span>}
          {errors.name?.type === 'pattern' && <span className="custom-input__invalid-text">{'Некорректное имя'}</span>}
          {(errors.name?.type === 'minLength' || errors.name?.type === 'maxLength') && <span className="custom-input__invalid-text">{'Имя должно содержать от 1 до 15 символов'}</span>}
        </div>
        <div className={`custom-input ${errors.tel ? 'custom-input--invalid' : ''} booking-form__input`}>
          <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
          <input type="tel" id="tel" placeholder="Телефон"
            {...register('tel',
              { required: true,
                pattern: /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
                onBlur: handleInputBlur
              })}
            aria-invalid={errors.tel ? 'true' : 'false'}
          />
          {errors.tel && <span className="custom-input__invalid-text">{'Введите номер телефона в формате +7 (000) 000-00-00'}</span>}
        </div>
        <div className={`custom-input ${errors.person ? 'custom-input--invalid' : ''} booking-form__input`}>
          <label className="custom-input__label" htmlFor="person">Количество участников</label>
          <input type="number" id="person" placeholder="Количество участников"
            {...register('person',
              { required: true,
                min: currentQuest?.peopleMinMax[0],
                max: currentQuest?.peopleMinMax[1] })}
            aria-invalid={errors.person ? 'true' : 'false'}
          />
          {errors.person?.type === 'required' && <span className="custom-input__invalid-text">{'Укажите количество участников'}</span>}
          {errors.person?.type === 'min' && <span className="custom-input__invalid-text">{`Минимальное количество участников: ${currentQuest?.peopleMinMax[0] ?? ''}`}</span>}
          {errors.person?.type === 'max' && <span className="custom-input__invalid-text">{`Максимальное количество участников: ${currentQuest?.peopleMinMax[1] ?? ''}`}</span>}
        </div>
        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input type="checkbox" id="children" {...register('children', { required: false })} aria-invalid={errors.children ? 'true' : 'false'} />
          <span className="custom-checkbox__icon">
            <svg width="20" height="17" aria-hidden="true">
              <use xlinkHref="#icon-tick"></use>
            </svg>
          </span>
          <span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
        </label>
      </fieldset>
      <button className="btn btn--accent btn--cta booking-form__submit" type="submit" disabled={questBookingStatus === RequestStatus.Loading || isSubmitting}>Забронировать</button>
      <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
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
  );
}

export default BookingForm;
