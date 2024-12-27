export default async function QuizById({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <main>
      <h1>Hello world {id}</h1>
    </main>
  );
}
