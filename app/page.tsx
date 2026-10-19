import { GlobLoader } from '../components/GlobLoader';
import { ImportLoader } from '../components/ImportLoader';

export default function Page() {
  return (
    <main>
      <GlobLoader />
      <ImportLoader />
    </main>
  );
}
