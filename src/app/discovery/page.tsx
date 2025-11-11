async function getGrants() { return [{ id: 1, title: 'HRF BTC Drop', filter: 'Nigerian UI/UX' }]; } // Later: fetch('/api/grants')
export default async function Discovery() {
  const grants = await getGrants();
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      {grants.map(g => <div key={g.id} className="p-4 bg-gray-800 rounded hover:bg-orange-500">{g.title}</div>)}
    </div>
  );
}