export default function generateUrl(
  subpage: string,
  params: Record<any, any> = {}
) {
  let paramsString = "";
  if (Object.keys(params).length > 0) {
    paramsString = "&" + new URLSearchParams(params).toString();
  }
  return (
    window._woopriceman.admin_url +
    "/admin.php?page=woopriceman&subpage=" +
    subpage +
    paramsString
  );
}
