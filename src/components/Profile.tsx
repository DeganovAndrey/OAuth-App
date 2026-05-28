import { useProfile } from "../hooks/useProfile";

const Profile = ({ id }: { id: number }) => {
  const { data, error, isLoading } = useProfile(id);

  if (error) return <h2>{error.message}</h2>;
  if (isLoading) return <h2>Loading...</h2>;
  if (!data) return null;

  return (
    <div>
      <h3>
        {data?.first_name} {data?.last_name}
      </h3>
      <p>{data?.email}</p>
      <img src={data?.avatar} alt={data.first_name} />
    </div>
  );
};

export default Profile;
