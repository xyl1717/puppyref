import { useState } from 'react';
import { useAddPuppyMutation } from '../../store/api';

export default function PuppyForm() {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [addPuppy, { isLoading, error }] = useAddPuppyMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addPuppy({ name, breed, imageUrl: 'https://loremflickr.com/200/300/dog' }).unwrap();
      setName(''); // Clear form fields
      setBreed('');
    } catch (e) {
      console.error('Failed to add puppy:', e);
    }
  };

  return (
    <>
      <h2>Add a Puppy</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input name="puppyName" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Breed
          <input name="breed" value={breed} onChange={(e) => setBreed(e.target.value)} />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add to Roster'}
        </button>
        {error && <output>Error: {error.message}</output>}
      </form>
    </>
  );
}
