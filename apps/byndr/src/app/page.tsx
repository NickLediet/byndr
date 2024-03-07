import { Header as AppHeader } from './components';
import { ImportCsvForm } from './import-csv-form'

export default async function Index() {
  return (
    <div className="w-full">
      <AppHeader />
      <main className="h-full container max-w-xl mx-auto flex items-center">
        <ImportCsvForm />
      </main>
    </div>
  );
}
