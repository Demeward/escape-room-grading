import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundPage() {
  return (
    <main className="page-content">
      <div className="container">
        <h1 className="title title--size-m page-content__title">404. Страница не найдена</h1>
        <Link className="btn btn--accent btn--cta" to={AppRoute.Main} style={{marginTop: '50px'}}>Вернуться на главную</Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
