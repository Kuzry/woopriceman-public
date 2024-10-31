import Dashboard from "./Dashboard/Dashboard";
import EditPrice from "./EditPrice/EditPrice";
import Settings from "./Settings/Settings";
import License from "./License/License";

export default function Layout() {
  const urlSearchParams = new URLSearchParams(window.location.search),
    subpage = urlSearchParams.get("subpage");

  return (
    <>
      {(null === subpage || "dashboard" === subpage) && <Dashboard />}
      {"edit-price" === subpage && (
        <EditPrice priceId={urlSearchParams.get("id") as unknown as number} />
      )}
      {"settings" === subpage && <Settings />}
      {"license" === subpage && <License />}
    </>
  );
}
