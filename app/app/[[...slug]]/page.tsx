import AppShell from '../../../app-shell';
import AppPage from '../../../app-page';
export default async function Page({params}:{params:Promise<{slug?:string[]}>}){const p=await params;return <AppShell><div className="app-content"><AppPage slug={p.slug||[]}/></div></AppShell>}
