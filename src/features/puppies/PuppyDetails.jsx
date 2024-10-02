import { useGetPuppyQuery, useDeletePuppyMutation } from '../../store/api';

export default function PuppyDetails({ selectedPuppyId, setSelectedPuppyId }) {
  const { data: puppy, isLoading, error } = useGetPuppyQuery(selectedPuppyId, {
    skip: !selectedPuppyId,
  });
  const [deletePuppy, { isLoading: isDeleting }] = useDeletePuppyMutation();

  if (!selectedPuppyId) {
    return <p>Please select a puppy to see more details.</p>;
  }

  if (isLoading) return <p>Loading puppy information...</p>;
  if (error) return <p>Failed to load puppy details: {error.message}</p>;

  const handleRemove = async (id) => {
    await deletePuppy(id);
    setSelectedPuppyId(null); // Clear selection after deletion
  };

  return (
    <aside>
      <h2>Selected Puppy</h2>
      <h3>
        {puppy.name} #{puppy.id}
      </h3>
      <p>{puppy.breed}</p>
      <p>Team {puppy.team?.name ?? 'Unassigned'}</p>
      <button onClick={() => handleRemove(puppy.id)} disabled={isDeleting}>
        {isDeleting ? 'Removing...' : 'Remove from roster'}
      </button>
      <figure>
        <img src={puppy.imageUrl} alt={puppy.name} />
      </figure>
    </aside>
  );
}
