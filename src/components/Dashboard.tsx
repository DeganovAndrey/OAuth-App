import { useAuth } from "../context/useAuth";
import { useProfile } from "../hooks/useProfile";

const Dashboard = () => {
  const { logout } = useAuth();
  const { data, error, isLoading, isFetching } = useProfile();

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>{error.message}</h2>;
  if (!data) return null;

  return (
    <div>
      {isFetching && <p>Фоновое обновление данных</p>}
      <h3>
        Приветствуем тебя, {data?.first_name} {data?.last_name}!
      </h3>
      <p>{data?.email}</p>

      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Dashboard;
