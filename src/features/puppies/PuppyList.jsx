import { useGetPuppiesQuery } from '../../store/api';

export default function PuppyList({ setSelectedPuppyId }) {
  const { data: puppies = [], isLoading, error } = useGetPuppiesQuery();

  if (isLoading) return <p>Loading puppies...</p>;
  if (error) return <p>Failed to load puppies: {error.message}</p>;

  return (
    <article>
      <h2>Roster</h2>
      <ul className="puppies">
        {puppies.map((p) => (
          <li key={p.id}>
            <h3>
              {p.name} #{p.id}
            </h3>
            <figure>
              <img src={p.imageUrl} alt={p.name} />
            </figure>
            <button onClick={() => setSelectedPuppyId(p.id)}>See details</button>
          </li>
        ))}
      </ul>
    </article>
  );
}
