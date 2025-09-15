export default function SystemTab({ data }) {
  return (
    <div>
      <p>Version: {data.version}</p>
      <p>Created: {data.created}</p>
      <p>Created by: {data.createdBy}</p>
    </div>
  );
}
