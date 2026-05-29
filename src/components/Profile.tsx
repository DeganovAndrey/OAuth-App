import { useAuth } from "src/context/useAuth";
import { useProfile } from "../hooks/useProfile";

const Profile = () => {
  const { user } = useAuth();
  const { data, error, isLoading, isFetching } = useProfile(user?.id);

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>{error.message}</h2>;
  if (!data) return null;

  return (
    <div>
      {isFetching && <p>Фоновое обновление данных</p>}
      <h3>
        {data?.first_name} {data?.last_name}
      </h3>
      <p>{data?.email}</p>
      <img src={data?.avatar} alt={data.first_name} />
    </div>
  );
};

export default Profile;
